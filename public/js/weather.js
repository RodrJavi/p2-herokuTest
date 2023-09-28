async function getForecast(lat, lon) {
  const weatherURL = `/api/weather?lat=${lat}&lon=${lon}`;
  // Fetches weather using the route to open weather api
  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

async function getCoordinates(cityName) {
  const coordinatesURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${weatherAPIKey}`;
  fetch(coordinatesURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      getForecast(data[0].lat, data[0].lon);
    });
}
