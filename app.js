const { response } = require("express");
const express = require("express");
const https = require("https");
const { dirname } = require("path");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var city = req.body.cityName;

  const query = city;
  const apiKey = "57ce6ca4213c10e40c47e5c863c1e469";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    units;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const image = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/" + image + "@2x.png";
      res.write(
        "<h1>The temperature in" +
          city +
          " is " +
          temp +
          " degress Celcius.</h1>"
      );
      res.write("<p>The weather is currently " + description + "<p>");
      res.write("<img src =" + imgUrl + ">");
      res.send();
    });
  });
});

app.listen(port, function () {
  console.log("started listening");
});
