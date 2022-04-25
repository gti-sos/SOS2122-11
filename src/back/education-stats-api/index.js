//############## Api education-stats ###########################
const BASE_API_URL = "/api/v2/education-stats";
const fs = require('fs');
var path = require('path');
var DataStore = require("nedb");
var dbFile = path.join(__dirname, 'education-stats.db');
var db = new DataStore({filename: dbFile, autoload:true});


var educationStatsInit = [
	{
		country:"iraq",
		year:"2018",
		dropCoefficients:"21",
		completionCoefficients:"32.45",
		gobermentExpenditure:"2.93"
	},
	{
		country:"afghanistan",
		year:"2015",
		dropCoefficients:"39",
		completionCoefficients:"36.95",
		gobermentExpenditure:"3.25"
	},
	{
		country:"pakistan",
		year:"2018",
		dropCoefficients:"27",
		completionCoefficients:"49.54",
		gobermentExpenditure:"2.7"
	},
	{
		country:"india",
		year:"2015",
		dropCoefficients:"9",
		completionCoefficients:"81.3",
		gobermentExpenditure:"3.28"
	},
	{
		country:"honduras",
		year:"2018",
		dropCoefficients:"27",
		completionCoefficients:"53.35",
		gobermentExpenditure:"6.05"
	},
	{
		country:"brasil",
		year:"2018",
		dropCoefficients:"1",
		completionCoefficients:"85.69",
		gobermentExpenditure:"6.08"
	},
];
var educationStats =[];

//Aux methods 
function bodyCheck(updateCountry){
	return (!updateCountry.country || !updateCountry.year || !updateCountry.dropCoefficients ||
		!updateCountry.completionCoefficients || !updateCountry.gobermentExpenditure);
}
module.exports.register = (app) => {
	
	//Carga inicial de datos
	app.get(BASE_API_URL+"/loadInitialData",(req,res)=>{
	
		db.find({}, function(error, educationStats){
			if(error){
				return res.sendStatus(500, "Client error");
			}
			else {
				db.insert(educationStatsInit);
            	return res.send(JSON.stringify(educationStatsInit, null, 2));
        	}
    	});
	})
	
	
	
	//Metodos GET (Colección, recurso o busqueda por variable)
	app.get(BASE_API_URL ,(req,res)=>{
		var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var search = {};
    
        if(req.query.country) {search["country"] = req.query.country;}
        if(req.query.year) {
			search["year"] = req.query.year;
		}else if (req.query.from || req.query.to){
			search["year"] = {$gte:(req.query.from), $lte:(req.query.to) };
		}
        if(req.query.dropCoefficients) {search["dropCoefficients"] = req.query.dropCoefficients;}
        if(req.query.completionCoefficients) {search["completionCoefficients"] = req.query.completionCoefficients;}
        if(req.query.gobermentExpenditure) {search["gobermentExpenditure"] = req.query.gobermentExpenditure;}
        
		if(db.count({}) == 0){
			return res.sendStatus(404, "No hay recursos cargados, dirigete a la dirección loadInitialData");
		} else {
			db.find(search).skip(offset).limit(limit).exec((err,data)=>{
				if(err){
					console.error("ERROR accessing DB in GET");
					return res.sendStatus(500);
				}else {
					if (data != 0){
						data.forEach((a)=>{delete a._id; });
						return res.status(200).send(JSON.stringify(data,null,2));
					} else {
						return res.sendStatus(404, "No source found");
					}
				}
			});
		}		
	});
	
	app.get(BASE_API_URL+"/:country/:year",(req,res)=>{
		var country = req.params.country;
		var year = req.params.year;
   
    	db.find({country: country, year: year}, function(err, educationDB){

        	if(err) {
            	res.sendStatus(404, "Source not found");
        	}
    	    if(educationDB == 0){
	            res.sendStatus(404, "Source not found"); 
        	}else{
            	var stat = educationDB.map((s)=>{
                	return {country : s.country, year : s.year, dropCoefficients : s.dropCoefficients, completionCoefficients : s.completionCoefficients, gobermentExpenditure : s.gobermentExpenditure};
            	});
            	res.send(JSON.stringify(stat[0],null,2));
        	}
        
    	})
	});	

	//Metodos POST
	app.post(BASE_API_URL, (req,res)=>{
		var updateCountry = req.body;
		
		db.find({$and: [{country: updateCountry.country}, {year: updateCountry.year}]},
			(error, resources) =>{
				if(error){
					console.error("Error accesing DB");
					res.sendStatus(500);
				} else {
					if(resources.length !=0){
						res.sendStatus(409, "Conflict: The resource already exist");
					} else if(bodyCheck(updateCountry) || Object.keys(updateCountry).length != 5){
						res.sendStatus(400, "Bad request, invalid fields.")
					} else {
						db.insert(updateCountry);
						res.sendStatus(201, "Created");	
					}
				}
			}
		);		
	});
	
	app.post(BASE_API_URL+"/:country/:year/", (req,res)=>{
		res.sendStatus(405, "Method not allowed");
	});
	
	
	//Metodos DELETE
	app.delete(BASE_API_URL, (req,res)=>{
		
		db.remove({}, {multi: true}, (error, statRemoved) =>{
			if(error){
				console.error(error);
				res.sendStatus(500);
			} else {
				if(statRemoved == 0){
					res.sendStatus(404, "Not found")
				} else {
					res.sendStatus(200, "Ok");
				}
				
			}
		})		
	});
	
	app.delete(BASE_API_URL+"/:country/:year", (req,res)=>{
		var oldCountry = req.params.country;
		var year = req.params.year;
		
		db.remove({country: oldCountry, year: year}, {}, (error, statRemoved) =>{
			if(error){
				console.error(error);
				res.sendStatus(500);
			} else {
				if(statRemoved == 0){
					res.sendStatus(404, "No data found to delete");
				} else {
					res.sendStatus(200, "Ok");
				}
			}
		})		
	});
	
	//Metodos PUT
	app.put(BASE_API_URL, (req,res)=>{
		res.sendStatus(405, "Method not allowed");
	});
	
	app.put(BASE_API_URL+"/:country/:year/", (req,res)=>{
		var country = req.params.country;
		var year = req.params.year;
		var updatedCountry = req.body;

		var query = {"country": country, "year": year};
		
		if(bodyCheck(updatedCountry) |  country != updatedCountry.country | year != updatedCountry.year){
			return res.sendStatus(400, "Bad request");
		} else {
			db.update(query, updatedCountry, (error, data) =>{
				if(error){
					console.error("Error accesing DB");
					res.sendStatus(500);
				} else {
					if(data == 0){
						res.sendStatus(404, "Source not found to update");
					} else {
						res.sendStatus(200, "Ok");
					}
				}
				
			})
		}	
	});

}
