function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");
  let dateElement = new Date(response.data.time * 1000);

  let currentHour = dateElement.getHours();
  let body = document.body;
  let button = document.querySelector(".search-form-button");

  if (currentHour >= 18 || currentHour < 6) {
    body.classList.remove("day");
    body.classList.add("night");
    button.classList.add("night");
  } else {
    body.classList.remove("night");
    body.classList.add("day");
    button.classList.remove("night");
  }

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(dateElement);
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  speedElement.innerHTML = `${response.data.wind.speed}km/hr`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon"/>`;
  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "dec30ab936f6fe43ot4b0dead25ade10";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "dec30ab936f6fe43ot4b0dead25ade10";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="weather-forecast-day">
    <div class="weather-forecast-date">${formatDay(day.time)}</div>
    <div class="weather-forecast-icon">
    <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
    </div>
    <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature">
        <strong>${Math.round(day.temperature.maximum)}°</strong>
      </span>
      <span class="weather-forecast-temperature-min">${Math.round(
        day.temperature.minimum
      )}°</span>
      </div>
  </div>
  `;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Melbourne");
