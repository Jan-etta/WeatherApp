let now = new Date();
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
let hour = now.getHours();
let minute = now.getMinutes();
let todayDay = days[now.getDay()];
if (minute < 10) {
    minute = `0${minute}`;
}
let currentDay = document.querySelector("#day");
let currentTime = document.querySelector("#time");
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", form);
currentDay.innerHTML = ` ${todayDay}`;
currentTime.innerHTML = ` ${hour}:${minute}`;

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
}

function displayForecast(response) {
    console.log(response.data.daily);
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#five-day-forecast");
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay, index) {
        if (index < 5) {
            forecastHTML =
                forecastHTML +
                `
      <div class="col" id= "dates">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
        />
        <div class="weather-forecast-temperatures">
          <span class="maximum-temperature"> ${Math.round(
            forecastDay.temp.max
          )}° | </span>
          <span class="minimum-temperature"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
        }
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function form(event) {
    event.preventDefault();
    let input = document.querySelector("#city-form-input");
    searchCity(input.value);
}

function searchCity(city) {
    let apiKey = "e638b8f1ff104d68004aac76a3021cf7";
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(api).then(showTemp);
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiurl).then(displayForecast);
}

function showTemp(response) {
    getForecast(response.data.coord);
    let temperature = Math.round(response.data.main.temp);
    let todaysTemp = document.querySelector("#todays-temp");
    let city = document.querySelector("h1");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let fahrenheit = document.querySelector("#fahrenheit");
    let celcius = document.querySelector("#celcius");
    celcius.addEventListener("click", convertC);
    fahrenheit.addEventListener("click", convertF);
    todaysTemp.innerHTML = `${temperature}°c`;
    city.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}  %`;
    windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
    //unit convertor
    function convertF(event) {
        event.preventDefault();
        let temperatureElement = document.querySelector("#todays-temp");
        temperatureElement.innerHTML = Math.round(temperature * 1.8 + 32);
    }

    function convertC(event) {
        event.preventDefault();
        let temperatureElement = document.querySelector("#todays-temp");
        temperatureElement.innerHTML = temperature;
    }
    //icon
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function retrievePosition(position) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showTemp);
}

function getPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(retrievePosition);
}
let getLocation = document.querySelector("#current-location-button");
getLocation.addEventListener("click", getPosition);
searchCity("London");