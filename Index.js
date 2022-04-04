const cool= require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");
var serveIndex = require('serve-index');
const fs = require('fs');

//Inicializa en otro archivo 
//const backend = require("./src/back");
//backend(app);
////////////////////////////////////

app.get("/api/v1/unequality-stats/docs", (request, response) => {
	response.redirect(301, 'https://documenter.getpostman.com/view/14951179/UVsPP4hn');
});

app.get("/api/v1/education-stats/docs", (request, response) => {
	response.redirect(301, 'https://documenter.getpostman.com/view/14951179/UVsPP4hn');
});

const app=express();

app.get("/api/v1/unequality-stats/docs", (request, response) => {
	response.redirect(301, 'https://documenter.getpostman.com/view/14951179/UVsPP4hn');
});

const port= process.env.PORT || 8080;
app.use(bodyParser.json());

const BASE_API_URL = "/api/v1"; 

const Ineq_api = require("./src/back/Inequality-stats");
const education_api = requirre("./src/back/eduation-stats");
Ineq_api.register(app);
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



