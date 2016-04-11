$(document).ready(function() {
  var lat = 0;
  var long = 0;
  var temp = 0;

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        getLocationName();
        getWeatherData();
      });
    } else {
      $('location').html("Geolocation is not supported by your browser");
    }
  }

  function getLocationName() {
    var nameUrl = "http://api.geonames.org/findNearbyPlaceNameJSON?lat=" + lat + "&lng=" + long + "&username=playernox";
    $.getJSON(nameUrl)
      .done(function(data) {
        $('#location').html(data.geonames[0].name);
      })
      .fail(function(error) {
        console.log(error);
      });
  }

  function getWeatherData() {
    var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "9&APPID=5b0530235264ae9772c53b8a59018b69&units=metric";
    $.getJSON(weatherUrl)
      .done(function(data) {
        $('#weather').html(data.weather[0].description);
        temp = data.main.temp;
        $('#temperature').html(temp);
        $('#weatherPic').attr('src', "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        console.log("http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
      })
      .fail(function(error) {
        console.log(error);
      });
  }

  $('#tempChange').on('click', function(element) {
    console.log(element);
    if (element.target.text === "C") {
      temp = (temp * (9 / 5) + 32);
      $('#temperature').html(temp);
      $('#tempChange').html("K");
    } else if (element.target.text === "K") {
      temp = (temp - 32) * 5 / 9;
      $("#temperature").html(temp);
      $('#tempChange').html("C");
    }
  });
  getLocation();
});
