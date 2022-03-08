const cool= require("cool-ascii-faces");
const express = require("express");

const app=express();
const port= process.env.PORT || 8080;
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