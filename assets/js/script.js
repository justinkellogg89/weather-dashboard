//AJAX call searching city
$("#searchIcon").on("click", function(e) {
  e.preventDefault();
  var city = $("#searchInput").val();
  console.log(city);
  var searchCriteria =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=7413c3086c5dd2422988610e26a92cea&units=imperial";

  var li = $("<li>").append(city);
  var ul = $("<ul>").append(li);
  $("#searchHistory").prepend(ul);
  storeSearch();

  function storeSearch() {
    var searchHistory = [];
    searchHistory.push("#searchHistory");
    localStorage.setItem("search", city);
  }

  $.ajax({
    url: searchCriteria,
    method: "GET"
  }).then(function(r) {
    console.log(r);
    $(".city").html("<h1>" + r.name + " Weather Details</h1>");
    $(".temp").text("Temperature: " + r.main.temp + " degrees");
    $(".humidity").text("Humidity: " + r.main.humidity + "%");
    $(".wind").text("Wind Speed: " + r.wind.speed + " mph");
    // $(".uv").text("UV Index: " + )
    $(".detailsBox").show();

    var lat = r.coord.lat;
    var lon = r.coord.lon;
    var searchUV =
      "http://api.openweathermap.org/data/2.5/uvi?appid=7413c3086c5dd2422988610e26a92cea&lat=" +
      lat +
      "&lon=" +
      lon;

    $.ajax({
      url: searchUV,
      method: "GET"
    }).then(function(r) {
      console.log(r);
      var uvIndex = r.value;
      $(".uv").text("UV Index: " + uvIndex);
    });
  });
  var searchFiveDay =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=7413c3086c5dd2422988610e26a92cea&units=imperial";

  $.ajax({
    url: searchFiveDay,
    method: "GET"
  }).then(function(r) {
    console.log(r);
    for (var i = 0; i < 5; i++) {
      var date = JSON.stringify(r.list[i].dt_txt);
      var temp = JSON.stringify(r.list[i].main.temp);
      var humidity = JSON.stringify(r.list[i].main.humidity);
      $(".card-body-" + i).append(date, temp, humidity);
    }
  });
});