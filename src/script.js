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
currentDay.innerHTML = ` ${todayDay}`;

let currentTime = document.querySelector("#time");
currentTime.innerHTML = ` ${hour}:${minute}`;

//wk5
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

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", form);

function showTemp(response) {
    let temperature = Math.round(response.data.main.temp);
    let todaysTemp = document.querySelector("#todays-temp");
    todaysTemp.innerHTML = `${temperature}°c`;
    let city = document.querySelector("h2");
    city.innerHTML = response.data.name;
}
//geolocation
function retrievePosition(position) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    // axios.get(url).then(showWeather);
}
let getLocation = document.querySelector("#current-location-button");
getLocation.addEventListener("submit", retrievePosition);
navigator.geolocation.getCurrentPosition(retrievePosition);