let userPosition;

// Function to get users location, will ask user to allow
navigator.geolocation.getCurrentPosition(function (position) {
  getForecast(position.coords.latitude, position.coords.longitude);
});
