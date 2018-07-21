var request = require("request");
var mtz  = require('moment-timezone');

var googleURLGen = (Address,callback)=> {
var encodedURL = encodeURIComponent(Address);
var googleURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+encodedURL;
   //console.log(googleURL);
var getLoc  = request({
                    url : googleURL,
                    json : true },(err,response,body) =>{
                    console.log(JSON.stringify(body.status,undefined,2));
                    if (err){
                       callback("Connectivity issue");
                    }else if (body.status === "OVER_QUERY_LIMIT"){
                       callback(body.status + " Please try again"); 
                    }else if (body.status === "ZERO_RESULTS"){
                        callback("Not a valid address");
                    }
                    else if (body.status === "OK") {
                       callback(undefined,{
                           Address : response.body.results[0].formatted_address,
                           lat : response.body.results[0].geometry.location.lat,
                           lng : response.body.results[0].geometry.location.lng
                       });
                    }
                    });
   };
//return googleURL;
    
var temConvert = ((temp) => {
    temp = (temp - 32) * 5/9;

    return temp;
});
var weatherReport = (result,callback) =>{
console.log(result.lat);
var weatherURL = `https://api.darksky.net/forecast/debbe0d66c0fd7a7472467a47a45cdff/${result.lat},${result.lng}`;
var weatherInfo = request({
                url : weatherURL,
                json : true
                },(err,response,body) => {
                    console.log("Inside weather function");
                    console.log("Report " + JSON.stringify(response.body.timezone,undefined,2));
                    var c = mtz.tz(response.body.currently.time*1000,response.body.timezone).format();
                    callback(undefined,{
                        timezone : response.body.timezone,
                        climate : response.body.currently.summary,
                        time :  c.substring(11,19),
                        date :  c.substring(0,10),
                        temp :  temConvert(response.body.currently.temperature).toString().substring(0,4)                       
                    });
                });
};
module.exports = {
    googleURLGen,
    weatherReport
}

