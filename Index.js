const cool= require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const app=express();
const request =require('request');
var cors = require("cors");

//Inicializacion de puerto
const port= process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(cors());


//Inicializacion de Apis
//Inequality stats
//var inequality_api = require("./src/back/inequality-stats-api");
//inequality_api.register(app);
var inequality_api = require("./src/back/inequality-stats-api/v2");
inequality_api.register(app);

//Education stats
var education_api = require("./src/back/education-stats-api/");

	//Proxys
var paths = '/remoteApiSMI';
var apiServerHost = 'https://sos2122-27.herokuapp.com/api/v2/smi_stats'; 

app.use(paths, function(req, res){
	var url = apiServerHost + req.url;
	req.pipe(request(url)).pipe(res);
});

var paths1='/remoteApiAnimals';
var apiServerHost1 = 'http://bloowatch.org/developers/json/species';

app.use(paths1, function(req, res) {
  var url = apiServerHost1 + req.url;
  req.pipe(request(url)).pipe(res);
});
education_api.register(app);





app.use("/",express.static('public'));

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

//Datos postman
app.get("/api/v2/inequality-stats/docs", (request, response) => {
	response.redirect(301, 'https://documenter.getpostman.com/view/14951179/UyxdMVXv');
});

app.get("/api/v2/education-stats/docs", (request, response) => {
	response.redirect(301, 'https://documenter.getpostman.com/view/19481545/UyrBhvbJ');
});

