var BASE_API_PATH="/api/v1/inequality-stats";
const fs = require('fs');
var path = require('path');
var Datastore = require("nedb");
var dbFile = path.join(__dirname, 'inequality-stats.db');
var db = new Datastore({filename: dbFile,autoload:true});



const port = process.env.PORT || 8080;

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
        country:"Iraq",
        year:"2018",
        coefficients:"19.4",
        educations:"29.7",
        lifes:"15.9"
    },
    {
        country:"Afghanistan",
        year:"2015",
        coefficients:"30.4",
        educations:"44.8",
        lifes:"35.7"
    },
    {
        country:"Pakistan",
        year:"2018",
        coefficients:"29.6",
        educations:"43.5",
        lifes:"29.9"
    },
    {
        country:"India",
        year:"2015",
        coefficients:"26.5",
        educations:"39.4",
        lifes:"24"
    },
    {
        country:"Honduras",
        year:"2018",
        coefficients:"24.9",
        educations:"23",
        lifes:"13.3"
    },
    {
        country:"Brasil",
        year:"2018",
        coefficients:"23.6",
        educations:"22",
        lifes:"10.9"
    }];

	

var inequalitystats =[];
var inequality_countries=[];
module.exports.register = (app) => {

    //carga inicial de datos
	app.get(BASE_API_PATH  + "/loadInitialData", (req, res) => {
        
        //if (inequalitystats.length == 0) {
        //    try {
        //    let rawdata = fs.readFileSync('./back/inequality-stats.json');
        //    inequalitystats = JSON.parse(rawdata);
        //    db.insert(inequality_countries);
        //    } catch {
        //        console.log('Error parsing .json file');
        //}
        //    console.log('[!] inequality-stats.json loaded onto inequality_countries');
        //    console.log(JSON.stringify(inequalitystats, null));
        //    res.status(200).send("<h3>Successfuly loaded "+ inequalitystats.length + " resources</h3><p>You can head now to /api/v1/inequality-stats to check newly created resources</p>")
        //} else {
        //    console.log('[!] GET request to /loadInitialData but resources are already loaded.');
        //    res.status(400).send("<h1>Resources already loaded. Head back to /api/v1/inequality-stats to check them.</h1>")
        // }

            db.remove({}, {multi: true});
            db.insert(inequalitystatsInit);
            console.log(`Initial data: <${JSON.stringify(inequalitystatsInit, null, 2)}>`);
            res.sendStatus(200);
      
		
	});

    app.get(BASE_API_PATH , (req, res) => {
        var offset= parseInt(req.query.offset);
        var limit=parseInt(req.query.limit);
        var search = {};

        if (req.query.country) {search["country"] = req.query.country}
        if (req.query.year) {
          search['year'] = (req.query.year);
        }else if(req.query.from || req.query.to) {
          search['year'] = { $gte:(req.query.from), $lte:(req.query.to) };
        }
        if (req.query.coefficients) {search["coefficients"] = req.query.coefficients}
        if (req.query.educations) {search["educations"] = req.query.educations}
        if (req.query.lifes) {search["lifes"] = req.query.lifes}
        if (db.count({}) == 0) {
            console.log('[!] Se ha hecho una petición a los recursos pero no han sido cargados.');
            return res.status(404).send("<p>No se han cargado los recursos. Para ello añade en la dirección /loadInitialData</p>");
        } else {
            db.find(search).skip(offset).limit(limit).exec((err, dbdata) => {
                if (err) {
                    console.log("[!] Error al acceder a inequality-stats.db " + err);
                    return res.status(500).send("<h1>Error al acceder a la base de datos</h1>");
                } else {
                    if (dbdata == 0) {
                        console.log("[!] La base de datos está vacia");
                        return res.status(404).send("<h1>No se han cargado los recursos. Para ello añade en la dirección /loadInitialData</h1>");
                    } else {
                        dbdata.forEach((data) =>{ delete data._id});
                        return res.status(200).send(JSON.stringify(dbdata,null, 2));
                    }
                }
            })
        }
        });

 //GET a un recurso -- CODIGO NUEVO
 app.get(BASE_API_PATH + "/:country/:year", (req, res) => {
    var countryToGet = req.params.country;
    var yearToGet = req.params.year;
   
    
    
    db.find({country: countryToGet, year: yearToGet}, function(err, ineqInDB){
    console.log("Searching "+countryToGet+" "+yearToGet);
    console.log(ineqInDB);

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
            res.send(JSON.stringify(ineqToSend[0],null,2));
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

			
    var country = req.params.country;
    var year = req.params.year;
    
    db.remove({ country: country, year: year },{},(err, data)=>{
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
    console.log(req.body);
    //console.log(res);
    if (!updateineq.country 
        | !updateineq.year 
        | !updateineq.coefficients 
        | !updateineq.educations 
        | !updateineq.lifes
        | country != updateineq.country 
        | year != updateineq.year){
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
