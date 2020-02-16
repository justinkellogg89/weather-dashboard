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
var ul = $("<ul>").append(li)
$("#searchHistory").prepend(ul);   

  $.ajax({
    url: searchCriteria,
    method: "GET"
  }).then(function(r) {
    console.log(r);
    $(".city").html("<h1>" + r.name + " Weather Details</h1>");
    $(".temp").text("Temperature: " + r.main.temp + " degrees");
    $(".humidity").text("Humidity: " + r.main.humidity + "%");
    $(".wind").text("Wind Speed: " + r.wind.speed + " mph");
    $(".detailsBox").show();
    //  var UV
  });
});

//store response in variable

//display response in the html page
