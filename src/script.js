function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];

    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHTML = forecastHTML + `
      <div class="col-2">
        <div class="weather-forecast-date">${
                formatDay(forecastDay.dt)
            }</div>
        
        <img 
        src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
            }@2x.png" 
        alt="" 
        width="42"
    />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-max"> ${
                Math.round(forecastDay.temp.max)
            }° </span>
          <span 
          class="weather-forecast-min"> ${
                Math.round(forecastDay.temp.min)
            }° </
          span>
        </div>
      </div>
  `;
        }
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    console.log(forecastHTML);
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "e4799330ffe003d2d7f69849dc03f789";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${
        coordinates.lat
    }&lon=${
        coordinates.lon
    }&appid=${apiKey}&units=imperial`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}


function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");


    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#currentdate");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;


    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${
        response.data.weather[0].icon
    }@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    console.log(response);
    getForecast(response.data.coord);


}

function search(city) {
    let key = "7432bc33052157d23671be783f19aba7";
    let Apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    axios.get(Apiurl).then(displayTemperature);


}

function signUp(event) {
    event.preventDefault();
    let searchinput = document.querySelector("#search-text-input");
    search(searchinput.value);

}

function searchLocation(position) {
    let apiKey = "7432bc33052157d23671be783f19aba7";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
        position.coords.latitude
    }&lon=${
        position.coords.longitude
    }&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
}


function showPosition(position) {

    console.log(`Your Latitude is ${
        position.coords.latitude
    } and your longitude is ${
        position.coords.longitude
    }`);
    searchLocation(position);

}

function getCurrentLocation() {

    navigator.geolocation.getCurrentPosition(showPosition);

}
search("The Hague");
let form = document.querySelector("#searchform");
form.addEventListener("submit", signUp);
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
