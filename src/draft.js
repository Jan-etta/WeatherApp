function searchCity(city) {
    let apiKey = "e638b8f1ff104d68004aac76a3021cf7";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayCurrentWeather);
}

function displayCurrentWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
        response.data.main.temp
    );
}

function showTemperature(response) {
    console.log(response.data);
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = `${temperature}°C`;
}

function showPosition(position) {
    let h2 = document.querySelector("h2");
    h2.innerHTML = `Lat: ${position.coords.latitude} & Lon: ${position.coords.longitude} Temp:`;
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
}

function searchLocation(position) {
    // position.coords.latitude
    // position.coords.longitude
    let apiKey = "e638b8f1ff104d68004aac76a3021cf7";
    let apiUrl = `https://api.openweathermap.org/data/2.5/find?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayCurrentWeather);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

//
//1
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

//2
function form(event) {
    event.preventDefault();
    let input = document.querySelector("#city-form-input");
    let city = input.value;
    city.innerHTML = `${input.value}`;
}

function form(event) {
    event.preventDefault();
    let input = document.querySelector("#city-form-inpu");
    let h2 = document.querySelector("#city");
    if (searchInput.value) {
        h2.innerHTML = `${input.value}`;
    } else {
        alert(`Please enter a city`);
    }
    let city = input.value;
    searchCity(city);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", form);

function showTemp(response) {
    let temperature = Math.round(response.data.main.temp);
    let todaysTemp = document.querySelector("#todays-temp");
    todaysTemp.innerHTML = `${temperature}°c`;
    findCity(city);
}

function searchCity(city) {
    let units = "metric";
    let apiKey = "e638b8f1ff104d68004aac76a3021cf7";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=birmingham&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemp);
}
searchCity(city);