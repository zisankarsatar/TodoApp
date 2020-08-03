const express = require("express");
const app = express();
const path= require("path");

app.use(express.static(__dirname+ "/TodosApp-Angular7"));

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname+"/TodosApp-Angular7/index.html"));
    
});

app.listen(process.env.PORT || 8080);
console.log("Console listening!");
