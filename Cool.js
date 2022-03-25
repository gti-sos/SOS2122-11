const cool= require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const { application } = require("express");
Const application;
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
    }];

var inequalitystats = [
    {}
    
];

app.get(BASE_API_URL+"/inequality-stats/loadInitialData",(req,res)=>{
    inequalitystats= inequalitystatsInit;
    res.send("Datos cargados");
});

app.get(BASE_API_URL+"/inequality-stats",(req,res)=>{
    res.send(JSON.stringify(inequalitystats,null,2));
});



app.post(BASE_API_URL+"/inequality-stats", (req,res)=>{
    var newstats =req.body;
    
        
        if(inequalitystats.country==newstats.country && inequalitystats.year==newstats.year) {
                res.sendStatus(409);
                
                
        }else{
                console.log("Insertando nuevos datos "+ JSON.stringify(req.body, null,2));
                inequalitystats.push(req.body);
                res.sendStatus(201,"CREATED"); 
        }
            
       
    
});

app.post(BASE_API_URL+"/inequality-stats/:country/:year/", (req,res)=>{

    res.sendStatus(405);
});

app.delete(BASE_API_URL+"/inequality-stats/", (req,res)=>{
    inequalitystats= inequalitystats.delete;
    if(inequalitystats==0){
        res.sendStatus(404);
    }else{
        res.sendStatus(200);
    }
    
});

app.delete(BASE_API_URL+"/inequality-stats/:country/:year/", (req,res)=>{
    var country = req.params.country;
    var year = parseInt(req.params.year);
    
    inequalitystats=inequalitystats.filter((stat)=>{
        return(stat.country !=country || stat.year !=year );
    });
    res.sendStatus(200,"OK");
        
        
       
    
});

app.put(BASE_API_URL+"/inequality-stats/", (req,res)=>{

    res.sendStatus(405);
});