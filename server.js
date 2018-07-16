const express = require('express');
const hbs = require("hbs");
var app = express();
const port = process.env.PORT || 3000; 

// app.use((req,res,next) => {
//     console.log("Maintainance page");
// });

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        time : `${new Date().toString().substring(16,24)} IST` 
    });
});
app.get('/about',(req,res)=>{
    res.render('about.hbs');
});
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});