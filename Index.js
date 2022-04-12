const cool= require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");
//var serveIndex = require('serve-index');
const fs = require('fs');
const app=express();

///Inicializacion de puerto
const port= process.env.PORT || 8080;
app.use(bodyParser.json());

///Inicializacion de Apis
var inequality_api = require("./src/back/inequality-stats-api");
inequality_api.register(app);

///Llamada a backend
const Ineq_api = require("./src/back/inequality-stats-api");
const education_api = require("./src/back/education-stats");
Ineq_api.register(app);
education_api.register(app);


///Metodos get y post no relacionados
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

app.get("/api/v1/inequality-stats/docs", (request, response) => {
	response.redirect(301, 'https://documenter.getpostman.com/view/14951179/UVsPP4hn');
});

app.get("/api/v1/education-stats/docs", (request, response) => {
	response.redirect(301, 'https://documenter.getpostman.com/view/14951179/UVsPP4hn');
});



