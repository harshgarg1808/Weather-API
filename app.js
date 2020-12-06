const express = require("express")
const https = require('https');
const bodyparser = require('body-parser');
const app = express();

app.use(bodyparser.urlencoded({extended:true})); 

app.get("/", function(req, res){
    
    res.sendFile('/home/harsh/Desktop/WebD/Projects/Weather-API/index.html');
    
})

app.post("/",function(req,res){

    console.log(req.body.location);

    const location = req.body.location;
    const apikey   = "b261c60aed3508275b8029582a6e3873";
    const scale = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location +"&appid="+ apikey + "&units="+scale;
    https.get(url,function(response){
            console.log(response);

            response.on('data',function(d){
                const weatherData = (JSON.parse(d));
                const temp = (weatherData.main.temp);
                const weatherdesc = (weatherData.weather[0].description);
                const weatherIcon = (weatherData.weather[0].icon);

                const imageURL = "http://openweathermap.org/img/wn/"+ weatherIcon +"@2x.png"

                console.log(temp);
                console.log(weatherdesc);
                console.log(weatherIcon);

                res.write("<h1>The Weather currently is : " + weatherdesc);
                res.write("<h1>The Weather in " + location + " is : " + temp + " Degree Celcius <h1>")
                res.write("<img src=" + imageURL + ">");

                res.end();


            })
    });

});


app.listen(3000, function(){

    console.log("The Server is running on port 3000");
});