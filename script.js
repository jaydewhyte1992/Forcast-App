function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  let timeElement = document.querySelector("#time");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = "Monday 17:34";
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  speedElement.innerHTML = `${response.data.wind.speed}km/hr`;
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
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Melbourne");
