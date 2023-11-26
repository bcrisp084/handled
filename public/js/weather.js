const APIKEY = "7ce604287f42a2c24e790725482afef6";

// function apiCall(city) {
//   // Your existing API call code
// }

function reverseGeocode(lat, lon) {
  //   const reverseGeocodeUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${APIKEY}`;

  //   fetch(reverseGeocodeUrl)
  //   fetch(
  //     `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKEY}`
  //   )
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Extract city name from the reverse geocoding response
      console.log("data", data);
      //   const city = data[0].name;
      //   console.log("city", city);
      // Call the weather API with the obtained city
      //   apiCall(city);
    })
    .catch(function (error) {
      console.error("Error during reverse geocoding:", error.message);
      // Handle the error or call the weather API with a default city
      // apiCall('DefaultCity');
    });
}

function getLocationAndCallApi() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        // Call reverse geocoding function with obtained coordinates
        reverseGeocode(lat, lon);
      },
      function (error) {
        console.error("Error getting location:", error.message);
        // Handle the error or provide a default city
        // apiCall('DefaultCity');
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    // Handle the lack of geolocation support or provide a default city
    // apiCall('DefaultCity');
  }
}

// Call the function to get the location and make the API call
getLocationAndCallApi();
