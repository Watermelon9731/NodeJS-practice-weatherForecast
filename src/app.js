const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("../../weather-app/utils/forecast");

const app = express();
const port = 5000;

// Setup path
const publicDirectoryPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views/");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

// Setup API
// const WEATHER_API = "http://api.weatherstack.com/";
// const WEATHER_ACCESS_KEY = "9f699541109f01ea1fa5490a6511853f";
// const WEATHER_LOCATION = "Vietnam";
// const GEO_API = "http://api.ipstack.com/";
// const GEO_ACCESS_KEY = "f596fa7497308baf12e19d8e27d28da0";
// const GEO_IP = "42.117.31.134";

// const WEATHER_URL = `${WEATHER_API}current?access_key=${WEATHER_ACCESS_KEY}&query=${WEATHER_LOCATION}`;

app.get("/", (req, res) => {
  res.render("index", {
    title: "The Weather",
    page: "Home",
  });
});

app.get("/the-weather", (req, res) => {
  res.render("the-weather", {
    title: "The Weather",
    page: "App",
  });
});

app.get("/the-weather/data", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "You need to provide location",
    });
  }
  forecast(req.query.location, (error, body) => {
    if (error) {
      res.send({
        error: error,
      });
    }
    res.send({
      body: body,
      location: body.location,
      forecast: body.current,
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search key",
    });
  }
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
