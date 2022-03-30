var BASE_API_PATH="/api/v1/inequality-stats";
const fs = require('fs');
var path = require('path');
var Datastore = require("nedb");
var dbFile = path.join(__dirname, 'inequality-stats.db');
var db = new Datastore({filename: dbFile,autoload:true});

//const express = require("express");
//const bodyParser = require("body-parser");
//const res = require("express/lib/response");
//const { application } = require("express");

//Inicializa en otro archivo 
//const backend = require("./src/back");
//backend(app);
////////////////////////////////////



//Funcion auxiliar para saber si objeto existe en un Json array
function elementExists(obj, obj_t) {
	for (var i = 0; i < obj.length; i++) {
		if (obj[i] == obj_t) {
			return true;
		} else {
			false;
		}
	}
}
//Funcion auxiliar para saber si es un array valido
function isAO(val) {
    return val instanceof Array || val instanceof Object ? true : false;
}

var inequalitystatsInit = [
    {
        country:"iraq",
        year:2018,
        coefficients:19.4,
        educations:29.7,
        lifes:15.9
    },
    {
        country:"afghanistan",
        year:2015,
        coefficients:30.4,
        educations:44.8,
        lifes:35.7
    },
    {
        country:"pakistan",
        year:2018,
        coefficients:29.6,
        educations:43.5,
        lifes:29.9
    },
    {
        country:"India",
        year:2015,
        coefficients:26.5,
        educations:39.4,
        lifes:24
    },
    {
        country:"Honduras",
        year:2018,
        coefficients:24.9,
        educations:23,
        lifes:13.3
    },
    {
        country:"Brasil",
        year:2018,
        coefficients:23.6,
        educations:22,
        lifes:10.9
    }];

	

var inequalitystats =[];

module.exports.register = (app) => {
    //carga inicial de datos
	app.get(BASE_API_PATH  + "/loadInitialData", (req, res) => {
		db.insert(inequality_stats);
		console.log(`Initial data: <${JSON.stringify(inequality_stats, null, 2)}>`);
		res.sendStatus(200);
	});

    app.get(BASE_API_PATH , (req, res) => {
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var search = {};
    
        if(req.query.country) 
            search["country"] = req.query.country;
        if(req.query.year) 
            search["year"] = parseInt(req.query.year);
        if(req.query.coefficients) 
            search["coefficients"] = req.query.coefficients;
        if(req.query.educations) 
            search["educations"] = req.query.educations;
        if(req.query.lifes) 
            search["lifes"] = req.query.lifes;
        
    
        db.find(search).skip(offset).limit(limit).exec((err,data)=>{
            if(err){
                console.error("ERROR accessing DB in GET");
                res.sendStatus(500);
            }else {
                if (data.length != 0){
                    data.forEach((a)=>{delete a._id; }); 
                    console.log(search)
                    return res.send(JSON.stringify(data,null,2));
                    return res.sendStatus(200);
                } else {
                    console.log(search)
                    console.log("No data found");
                    return res.sendStatus(404);
                }
                
    
            }
        });
        });

 //GET a un recurso -- CODIGO NUEVO
 app.get(BASE_API_PATH + "/:country/:year", (req, res) => {
    var countryToGet = req.params.country;
    var yearToGet = req.params.year;
    
    
    db.find({country: countryToGet, year: yearToGet}, function(err, ineqInDB){
    console.log("Searching "+countryToGet+" "+yearToGet);
        if(err) {
            console.error(err);
            res.sendStatus(404);
        }
        if(ineqInDB.length==0){
            console.log("Resource not found: "+countryToGet+" "+yearToGet);
            res.sendStatus(404); // NOT FOUND
        }else{
            console.log(ineqInDB);
            var ineqToSend = ineqInDB.map((c)=>{
                return {country : c.country, year : c.year, coefficients : c.coefficients, educations : c.educations, lifes : c.lifes};
            });
            res.send(JSON.stringify(duToSend[0],null,2));
        }
        
    })
});

 //POST a la lista de recursos
app.post(BASE_API_PATH, (req, res) => {
    var newData = req.body;
    var country = req.body.country;
    var year = req.body.year; //lo tenemos pasado como string el valor, sino deberíamos usar un parseInt
    db.find({$and: [{country: newData.country}, {year: newData.year}]},

        (err, resources) =>{
            if(resources.length !=0){
                console.log("El recurso ya existe");
                res.sendStatus(409);
            }else if(!newData.country || !newData.year ||!newData.coefficients||!newData.educations || !newData.lifes  ||Object.keys(newData).length != 5){
                    console.log("El número de campos no es el correcto");
                    res.sendStatus(400);
            }else{
                console.log(`--CB API:\n  new resource <${newData.country}/${newData.year}> added`)
                db.insert(newData);
                res.status(201).json(newData);
            }

        }
    );
});

app.post(BASE_API_PATH + "/:country/:year", (req,res) => {
    console.log ("Unable to POST to a specific resource");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH, (req,res) => {
    db.remove({},{multi: true},(err, numIneqRemoved)=>{
        if(err){
            console.error("ERROR deleting DB evictions: "+err);
            res.sendStatus(500);
        }else{
            if(numIneqRemoved==0){
                res.sendStatus(404);
            }else{
                console.log("Resources deleted");
                res.sendStatus(200);
            }
        }
    })
  });


app.delete(BASE_API_PATH + "/:country/:year", (req,res) => {

			
    var countryToDelete = req.params.country;
    var yearToDelete = req.params.year;
    
    db.remove({country: countryToDelete, year: yearToDelete},{},(err, data)=>{
        if(err){
            console.error("ERROR deleting the resource in DELETE: "+err);
            res.sendStatus(500);
        }else{
            if(data==0){
                console.log("No data found to delete");
                res.sendStatus(404); // NOT FOUND
            }else{
                res.sendStatus(200); // OK
            }
        }
    })
    

});

app.put(BASE_API_PATH, (req,res) => {
    console.log("Unable to PUT to a list of resources");
    return res.sendStatus(405);
});

app.put(BASE_API_PATH + "/:country/:year", (req, res) => {
	
    var country = req.params.country;
    var year = req.params.year;
    var updateineq = req.body;
    var query = {"country":country, "year":year};

    if (!updateddu.country 
        || !updateddu.year 
        || !updateineq['coefficients'] 
        || !updateineq['educations'] 
        || !updateineq['lifes'] 
        || country != updateineq.country 
        || year != updateineq.year
        || Object.keys(updateineq).length != 5){

        console.log("Missing any field");
        return res.sendStatus(400);
    } 
    else {
        db.update(query,updateineq,(err,data) =>{
            if(err){
                console.error("ERROR accesing DB in PUT");
                res.sendStatus(500);
            }
            else{
                if(data == 0){
                    res.sendStatus(404);
                    console.log("No data in the database");
                }
                else{
                    res.sendStatus(200);
                    console.log("Resource updated");
                }
            }
        });
    }
});
}
