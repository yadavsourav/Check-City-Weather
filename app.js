const express = require("express");
const https = require("https");      // We dont need to install any module as it is native to nodejs
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
});


app.post("/", function(req, res){

    const query = req.body.cityName;
    const apikey = "032e16156c44111700dbecfe2b371d4b";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;

    https.get(url, function(response){
        console.log(response.statusCode);
        
        response.on("data", function(data){
           /*  console.log(data);   //this command gives data in hexadecimal form */
           
           /* so to convert it into readable JSON form */

          const weatherData = JSON.parse(data);
          const icon = weatherData.weather[0].icon;
          const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

          
          res.write("<p> The weather is currently " + weatherData.weather[0].description + "</p>");
          
          res.write("<h2> The temperature in Delhi is " + weatherData.main.temp + "</h2");

          res.write('<head><meta charset="utf-8"></head>');
          res.write('<img src=' + imageURL + ">");
          

          res.send();
/*           res.send("<h2>temperature at Delhi is " + weatherData.main.temp + "</h2>");
 */          /* console.log(weatherData.main.temp);
          console.log(weatherData.weather[0].description); */
          /* const object = {
            name: "Sourav",
            interest: "Vedanta"
          }
          console.log(JSON.stringify(object));   //It will convert data into string 
          */
        });
 
    })
    
})





app.listen(3000, function(){
    console.log("Server is running on 3000");
})