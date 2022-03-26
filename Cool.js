const cool= require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const { application } = require("express");

//Inicializa en otro archivo 
//const backend = require("./src/back");
//backend(app);
////////////////////////////////////

const app=express();
const port= process.env.PORT || 8080;

app.use(bodyParser.json());

const BASE_API_URL = "/api/v1"; 

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

//############## Api inequality-stats ###########################
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

	app.get(BASE_API_URL+"/inequality-stats/docs",(req,res)=>{
    
		res.writeHead(301,
			{Location: 'http://app.example.io'}
		  );
		  res.end();
});

var inequalitystats =[];

app.get(BASE_API_URL+"/inequality-stats/loadInitialData",(req,res)=>{
    
		
		inequalitystats= JSON.parse(JSON.stringify(inequalitystatsInit));
		console.log(JSON.stringify(inequalitystats, null));
		res.status(200).send("<h3>Successfuly loaded "+ inequalitystats.length + " resources</h3><p>You can head now to /api/v1/inequality-stats to check newly created resources</p>")
	
});

app.get(BASE_API_URL+"/inequality-stats",(req,res)=>{
    res.send(JSON.stringify(inequalitystats,null,2));
});

app.get(BASE_API_URL+"/inequality-stats/:country/:year", (req, res) => {
	console.log("[!] GET to " + req.params.country + ", checking if exists.");
	var country;
	inequalitystats.forEach(function(obj) {
		if (obj.country == req.params.country && obj.year == req.params.year) {
			country = obj;
		}
	});
	if (isAO(country) && country != null) {
		res.status(200).send(JSON.stringify(country, null, 2));	
	} else {
		console.log("[!] Someone has tried to GET a non-existent resource: \n-->" + req.params.country + "/" + req.params.year);
		res.status(404).send("<p>404: Resource not found</p>");	
	}
});

app.post(BASE_API_URL+"/inequality-stats", (req,res)=>{
    var updateCountry = req.body;
	console.log(updateCountry.country);
		console.log(updateCountry.year);
	var oldCountry;
	var del_index;
	console.log(`[!] Received: <${JSON.stringify(updateCountry, null)}> checking for coincidences...`);
	for(var i=0; i<inequalitystats.length; i++){
		if(inequalitystats[i].country==updateCountry.country && inequalitystats[i].year==updateCountry.year){
			oldCountry = inequalitystats[i];
			del_index = i;
		}
	}
	if (oldCountry == null) {
		console.log("[!] POST with: \n-->" + JSON.stringify(updateCountry, null) + " :: Not found in array.");
		res.status(200).send("<p>Added resource.</p>");
		inequalitystats.push(updateCountry);
	} else if (JSON.stringify(oldCountry, null) == JSON.stringify(updateCountry, null)) {
		console.log("[!] Someone has tried upload an existent resource: \n-->" + JSON.stringify(oldCountry, null));
		res.status(401).send("<p>Resource already exists.</p>");
	} else {
		console.log("[!] POST containing: \n-->" + JSON.stringify(updateCountry, null));
		res.status(401).send("<p>Error</p>");
	}
       
    
});

app.post(BASE_API_URL+"/inequality-stats/:country/:year/", (req,res)=>{

    res.sendStatus(405);
});

app.delete(BASE_API_URL+"/inequality-stats/", (req,res)=>{
    
    if(inequalitystats.length==0){
        res.status(400).send("<p>400: No resources found. Can't delete any.</p>");
    }else{
        inequalitystats= inequalitystats.delete;
		res.status(200).send("<p>200: All resources deleted.</p>");
    }
    
});

app.delete(BASE_API_URL+"/inequality-stats/:country/:year/", (req,res)=>{
    var oldCountry;
	var del_index;
	console.log("[!] Deletion requested for resource: /"+req.params.country+"/"+req.params.year+"\n [?] Checking existence.");
	for(var i=0; i<inequalitystats.length; i++){
		if(inequalitystats[i].country==req.params.country && inequalitystats[i].year==req.params.year){
			oldCountry = inequalitystats[i];
			del_index = i;
		}
	}
	if (oldCountry != null) {
		console.log("[-] Delete: "+ JSON.stringify(oldCountry,null));
		inequalitystats.splice(del_index, 1);
		res.status(200).send("<p>Resource deleted</p>");	
	} else {
		console.log("[!] Someone has tried to delete a non-existent resource: \n-->" + JSON.stringify(oldCountry, null));
		res.status(400).send("<p>Resource not found, can't delete.</p>");
	} 
    
});

app.put(BASE_API_URL+"/inequality-stats/", (req,res)=>{

    res.status(405).send('<p>405: Method not allowed</p>');
});

app.put(BASE_API_URL+"/inequality-stats/:country/:year/", (req,res)=>{
    var updateCountry = req.body;
	var oldCountry;
	console.log(`[!] New country to update: <${JSON.stringify(updateCountry, null)}>`);
			inequalitystats.forEach(function(obj) {
		if (obj.country == req.params.country && obj.year == req.params.year) {
			oldCountry = obj;
		}
	});
	if (oldCountry != null) {
		console.log("[-] Delete "+ JSON.stringify(oldCountry, null)+" to add resource: \n-->"+ JSON.stringify(updateCountry, null));
		delete inequalitystats[oldCountry];
		res.status(200).send("<p>Resource updated.</p>");
		inequalitystats.push(updateCountry);	
	} else {
		console.log("[!] Someone has tried to update a non-existent resource: \n-->" + JSON.stringify(oldCountry, null));
		res.status(400).send("<p>Resource not found, can't delete.</p>");
	}

});