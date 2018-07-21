var express = require("express");
var path = require("path");
var hbs  = require('hbs');
var qs  = require("querystring");
var weather = require("./weather");

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
        var Address = qs.parse(data);
        console.log(Address.loc)
        var url = weather.googleURLGen(Address.loc,(errorMessage,result)=>{
            if (errorMessage)
            {
                console.log(errorMessage);
            }
            else if (result)
            {
                console.log(result.Address);
                weather.weatherReport(result,(errorMessage,report)=>{
                    if (report){
                        res.render('about.hbs',{
                            Address : result.Address,
                            timezone : report.timezone,
                            climate : report.climate,
                            time :  report.time,
                            date :  report.date,
                            temp :  report.temp
                        });
                    }

                });
            }
        });
        data = "";
    });
    
});
app.listen(port,()=>{
    console.log("Server listening at port :" + port);
});