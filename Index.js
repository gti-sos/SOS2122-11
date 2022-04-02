const cool= require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const { application } = require("express");
var serveIndex = require('serve-index');
const fs = require('fs');
const app=express();


//Inicializa en otro archivo 
//const backend = require("./src/back");
//backend(app);
////////////////////////////////////




const port= process.env.PORT || 8080;
app.use(bodyParser.json());

const BASE_API_URL = "/api/v1"; 

const Ineq_api = require("./src/back/Inequality-stats");
Ineq_api.register(app);

app.use("/",express.static('public'));

app.get("/", (req,res)=>{
    console.log("Requested/route");
    res.send("<html><body><h1>SOS Grupo 11</h1></body></html>");
})

app.get("/cool", (req,res)=>{
    res.send("<html><body><h1>"+cool()+"</h1></body></html>");
});


app.listen(port,()=>{
    console.log(`server ready at port ${port}`);
});

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




//############## Api education-stats ###########################
var educationStatsInit = [
    {
        country:"iraq",
        year:2018,
        dropCoefficients:21,
        completionCoefficients:32.45,
        gobermentExpenditure:2.93
    },
    {
        country:"afghanistan",
        year:2015,
        dropCoefficients:39,
        completionCoefficients:36.95,
        gobermentExpenditure:3.25
    },
    {
        country:"pakistan",
        year:2018,
        dropCoefficients:27,
        completionCoefficients:49.54,
        gobermentExpenditure:2.7
    },
    {
        country:"india",
        year:2015,
        dropCoefficients:9,
        completionCoefficients:81.3,
        gobermentExpenditure:3.28
    },
    {
        country:"honduras",
        year:2018,
        dropCoefficients:27,
        completionCoefficients:53.35,
        gobermentExpenditure:6.05
    },
    {
        country:"brasil",
        year:2018,
        dropCoefficients:1,
        completionCoefficients:85.69,
        gobermentExpenditure:6.08
    }];

var educationStats =[];

app.get(BASE_API_URL+"/education-stats",(req,res)=>{
    res.send(JSON.stringify(educationStats,null,2));
});

app.get(BASE_API_URL+"/education-stats/loadInitialData",(req,res)=>{
    
		
	educationStats= JSON.parse(JSON.stringify(educationStatsInit));
	console.log(JSON.stringify(educationStats, null));
	res.sendStatus(200)

});

app.get(BASE_API_URL+"/education-stats/:country/:year", (req, res) => {
	console.log("[!] GET to " + req.params.country + ", checking if exists.");
	var country;
	educationStats.forEach(function(obj) {
		if (obj.country == req.params.country && obj.year == req.params.year) {
			country = obj;
		}
	});
	if (isAO(country) && country != null) {
		res.status(200).send(JSON.stringify(country, null, 2));	
	} else {
		console.log("[!] Someone has tried to GET a non-existent resource: \n-->" + req.params.country + "/" + req.params.year);
		res.sendStatus(404);	
	}
});

app.post(BASE_API_URL+"/education-stats", (req,res)=>{
    var updateCountry = req.body;
	console.log(updateCountry.country);
	console.log(updateCountry.year);
	var oldCountry;
	console.log(`[!] Received: <${JSON.stringify(updateCountry, null)}> checking for coincidences...`);
	for(var i=0; i<educationStats.length; i++){
		if(educationStats[i].country==updateCountry.country && educationStats[i].year==updateCountry.year){
			oldCountry = inequalitystats[i];
		}
	}
	if (oldCountry == null) {
		console.log("[!] POST with: \n-->" + JSON.stringify(updateCountry, null) + " :: Not found in array.");
		res.sendStatus(201);
		educationStats.push(updateCountry);
	} else if (JSON.stringify(oldCountry, null) == JSON.stringify(updateCountry, null)) {
		console.log("[!] Someone has tried to upload an existent resource: \n-->" + JSON.stringify(oldCountry, null));
		res.status(401).send("You can't add an element wich already exists");
	} else {
		console.log("[!] POST containing: \n-->" + JSON.stringify(updateCountry, null));
		res.sendStatus(401);
	}
    
});

app.post(BASE_API_URL+"/education-stats/:country/:year/", (req,res)=>{

    res.sendStatus(405);
});

app.delete(BASE_API_URL+"/education-stats", (req,res)=>{
    
    if(educationStats.length==0){
        res.status(400).send("No resources found. Can't delete any.");
    }else{
        educationStats= educationStats.delete;
		res.status(200);
    }
    
});

app.delete(BASE_API_URL+"/education-stats/:country/:year/", (req,res)=>{
    var oldCountry;
	var del_index;
	console.log("[!] Deletion requested for resource: /"+req.params.country+"/"+req.params.year+"\n [?] Checking existence.");
	for(var i=0; i<educationStats.length; i++){
		if(educationStats[i].country==req.params.country && educationStats[i].year==req.params.year){
			oldCountry = educationStats[i];
			del_index = i;
		}
	}
	if (oldCountry != null) {
		console.log("[-] Delete: "+ JSON.stringify(oldCountry,null));
		educationStats.splice(del_index, 1);
		res.sendStatus(200);	
	} else {
		console.log("[!] Someone has tried to delete a non-existent resource: \n-->" + JSON.stringify(oldCountry, null));
		res.status(400).send("Resource not found, can't delete.");
	} 
    
});

app.put(BASE_API_URL+"/education-stats", (req,res)=>{

    res.sendStatus(405);
});

app.put(BASE_API_URL+"/education-stats/:country/:year/", (req,res)=>{
    var updateCountry = req.body;
	var oldCountry;
	console.log(`[!] New country to update: <${JSON.stringify(updateCountry, null)}>`);
			educationStats.forEach(function(obj) {
		if (obj.country == req.params.country && obj.year == req.params.year) {
			oldCountry = obj;
		}
	});
	if (oldCountry != null) {
		console.log("[-] Delete "+ JSON.stringify(oldCountry, null)+" to add resource: \n-->"+ JSON.stringify(updateCountry, null));
		delete educationStats[oldCountry];
		res.sendStatus(200);
		educationStats.push(updateCountry);	
	} else {
		console.log("[!] Someone has tried to update a non-existent resource: \n-->" + JSON.stringify(oldCountry, null));
		res.status(400).send("Resource not found, can't delete.");
	}

});


app.get(BASE_API_URL+"/education-stats/docs",(req,res)=>{
    
	res.redirect("https://app.example.io");
});