var express = require("express");
var path = require("path");
var hbs  = require('hbs');
var qs  = require("querystring");

var app = express();
const port = process.env.PORT || 3000 ;

app.set('view engine',hbs);
app.use(express.static(__dirname + "/image"));
app.get("/",(req,res) =>{
    res.render('home.hbs');
});
app.get("/calc",(req,res)=>{
    console.log(req.url);
    res.render("calc.hbs");
});
var data = "";
app.post('/calc',(req,res)=>{
    req.on('data',(chunk)=>{
        data += chunk;
    });
    req.on('end',()=>{
        console.log(qs.parse(data));
        res.render('about.hbs',qs.parse(data));
        data = "";
    });
    
});
app.listen(port,()=>{
    console.log("Server listening at port :" + port);
});