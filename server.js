const express = require('express');
var app = express();
var hbs = require('hbs');
const port = process.env.PORT || 3000; 
app.get('/',(req,res)=>{
    res.send("<h1>Hi Uzeen Successfully rendered</h1>");
});
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});