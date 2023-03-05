console.log("Its client side Javascript file");

const weather = document.querySelector("form");
const searchLocation = document.querySelector("#locationInput");
const locationResult = document.querySelector("#locationResult");
const forecastResult = document.querySelector("#forecastResult");

weather.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = searchLocation.value;

  locationResult.textContent = "Loading...";
  forecastResult.textContent = "Loading...";

  fetch(`http://localhost:5000/the-weather/data?location=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          locationResult.textContent = "Please choose location first";
        } else {
          console.log(data);
          locationResult.textContent = `${data.location.country} - ${data.location.name}`;
          forecastResult.textContent = `It's ${data.forecast.temperature} degree with ${data.forecast.humidity}% humidity`;
          const weatherIcon = document.createElement('img');
          weatherIcon.src = data.forecast.weather_icons;
          weatherIcon.style.width = "100%";
          document.getElementById('weatherIconWrapper').appendChild(weatherIcon)
        }
      });
    }
  );
});
