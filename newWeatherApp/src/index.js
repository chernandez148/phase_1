const mainWeather = document.getElementById("weather");
const forecast = document.getElementById("forecast");
const sixDays = document.getElementById("six-days");
const currWeatherDay = document.getElementById("curr-weather-day");
const currTime = document.getElementById("time");
const currDay = document.getElementById("day");
const weatherForm = document.getElementById("weather-form");
const toggleDegrees = document.getElementById("labels");
const apiKey = "PYPZ68ENJ6QARNCD9LQBJJ64J";
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

document.getElementById("checkbox").disabled = true;
document.addEventListener("DOMContentLoaded", () => {
  weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const cityName = e.target.search.value;
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=us&include=hours%2Cdays%2Ccurrent&key=${apiKey}&contentType=json`;
    mainWeather.innerHTML = "";
    currWeatherDay.innerHTML = "";
    sixDays.innerHTML = "";

    document.querySelector("body").classList.add("bg-img-md-center");
    forecast.classList.remove("d-none");
    fetch(apiUrl)
      .then((resp) => resp.json())
      .then((weatherData) => {
        console.log(weatherData);
        renderMainDisplay(weatherData);
        currWeather(weatherData);
        const getArray = Object.values(weatherData);
        // get array of weatherData
        const getDays = Object.values(getArray[7]);
        // retrieve array from days 1-15
        const sliceDays = getDays.slice(1, 7);
        // slices days from array to retrieve index 0 - 7
        sliceDays.forEach(renderForecast);
      });
    document.getElementById("checkbox").disabled = false;
  });
});

const renderMainDisplay = (weatherData) => {
  // Display time, date, and month
  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes();
  let day = weekday[today.getDay()];
  let date = today.getDate();
  let month = monthNames[today.getMonth()];
  // Toggle between celcius and ferinheit
  let toggleDegreesAttribute = toggleDegrees.getAttribute("value");
  // Display weather info
  // mainWeather is set as a global variable
  mainWeather.classList.add("mt-3");
  const mainWeatherH1 = document.createElement("h1");
  const mainWeatherIcon = document.createElement("img");
  // Display city name
  const cityName = document.getElementById("city-name");

  currTime.textContent = time;
  currTime.classList.add("display-1");
  currDay.textContent = day + ", " + date + ` ${month}`;
  currDay.classList.add("display-6");
  mainWeatherH1.textContent =
    Math.round(weatherData.currentConditions.temp) + "\u00B0";
  mainWeatherH1.classList.add("display-6", "me-3");
  mainWeatherIcon.src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/3rd%20Set%20-%20Color/${weatherData.days[0].icon}.png`;
  cityName.textContent = weatherData.resolvedAddress;
  cityName.classList.add(
    "display-7",
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );

  mainWeather.appendChild(mainWeatherH1);
  mainWeather.appendChild(mainWeatherIcon);

  // Toggle between celcius and ferinheit
  toggleDegrees.addEventListener("click", () => {
    if (toggleDegreesAttribute == 0) {
      toggleDegreesAttribute = 1;
      mainWeatherH1.textContent =
        Math.round((weatherData.currentConditions.temp - 32) * 0.555) + "\xB0";
    } else if (toggleDegreesAttribute == 1) {
      toggleDegreesAttribute = 0;
      mainWeatherH1.textContent =
        Math.round(weatherData.currentConditions.temp) + "\u00B0";
    }
  });
};

const currWeather = (currData) => {
  // Left div of the main forecase divs
  const currWeatherDayLeftDiv = document.createElement("div");
  currWeatherDayLeftDiv.classList.add("text-center");
  const currWeatherDayH6 = document.createElement("h6");
  const currWeatherDayImg = document.createElement("img");
  const currWeather = document.createElement("h6");
  let toggleDegreesAttribute = toggleDegrees.getAttribute("alt");

  currWeatherDayH6.textContent = currData.days[0].datetime;
  currWeatherDayImg.src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/3rd%20Set%20-%20Color/${currData.days[0].icon}.png`;
  currWeather.textContent =
    Math.round(currData.days[0].tempmax) +
    "\u00B0" +
    "/" +
    Math.round(currData.days[0].tempmin) +
    "\u00B0";

  currWeatherDay.appendChild(currWeatherDayLeftDiv);
  currWeatherDayLeftDiv.appendChild(currWeatherDayH6);
  currWeatherDayLeftDiv.appendChild(currWeatherDayImg);
  currWeatherDayLeftDiv.appendChild(currWeather);

  // Toggle between celcius and ferinheit
  toggleDegrees.addEventListener("click", () => {
    if (toggleDegreesAttribute == 0) {
      toggleDegreesAttribute = 1;
      currWeather.textContent =
        Math.round((currData.days[0].tempmax - 32) * 0.555) +
        "\xB0" +
        "/" +
        Math.round((currData.days[0].tempmin - 32) * 0.555) +
        "\xB0";
    } else if (toggleDegreesAttribute == 1) {
      toggleDegreesAttribute = 0;
      currWeather.textContent =
        Math.round(currData.days[0].tempmax) +
        "\u00B0" +
        "/" +
        Math.round(currData.days[0].tempmin) +
        "\u00B0";
    }
  });

  // Right div of the main forecast divs
  const currWeatherDayRightDiv = document.createElement("div");
  currWeatherDayRightDiv.classList.add("ps-5", "curr-weather-day-right-div");
  const currWeatherCondition = document.createElement("p");
  const currHumidity = document.createElement("p");
  const windSpeed = document.createElement("p");
  const sunrise = document.createElement("p");
  const sunset = document.createElement("p");

  currWeatherCondition.textContent = currData.currentConditions.conditions;
  currHumidity.textContent = "Humidity: " + currData.currentConditions.humidity;
  windSpeed.textContent = "Wind speed: " + currData.currentConditions.windspeed;
  sunrise.textContent = "Sunrise: " + currData.currentConditions.sunrise;
  sunset.textContent = "Sunset: " + currData.currentConditions.sunset;

  currWeatherDay.appendChild(currWeatherDayRightDiv);
  currWeatherDayRightDiv.appendChild(currWeatherCondition);
  currWeatherDayRightDiv.appendChild(currHumidity);
  currWeatherDayRightDiv.appendChild(windSpeed);
  currWeatherDayRightDiv.appendChild(sunrise);
  currWeatherDayRightDiv.appendChild(sunset);
};

const renderForecast = (forecastData) => {
  // Renders rest of the forecast divs
  const forecastColumns = document.createElement("div");
  forecastColumns.classList.add("col", "py-5", "mx-3", "border", "rounded");
  const forecastH6 = document.createElement("h6");
  const forecastIcons = document.createElement("img");
  const forecaseWeather = document.createElement("h6");
  let toggleDegreesAttribute = toggleDegrees.getAttribute("title");

  forecastH6.textContent = forecastData.datetime;
  forecastIcons.src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/3rd%20Set%20-%20Color/${forecastData.icon}.png`;
  forecaseWeather.textContent =
    Math.round(forecastData.tempmax) +
    "\u00B0" +
    "/" +
    Math.round(forecastData.tempmin) +
    "\u00B0";

  sixDays.appendChild(forecastColumns);
  forecastColumns.appendChild(forecastH6);
  forecastColumns.appendChild(forecastIcons);
  forecastColumns.appendChild(forecaseWeather);

  // Hover effect on forecast columns
  forecastColumns.addEventListener("mouseover", () => {
    forecastColumns.classList.add("current");
  });

  // Toggle between celcius and ferinheit
  toggleDegrees.addEventListener("click", () => {
    if (toggleDegreesAttribute == 0) {
      toggleDegreesAttribute = 1;
      forecaseWeather.textContent =
        Math.round((forecastData.tempmax - 32) * 0.555) +
        "\u00B0" +
        "/" +
        Math.round((forecastData.tempmin - 32) * 0.555) +
        "\u00B0";
    } else if (toggleDegreesAttribute == 1) {
      toggleDegreesAttribute = 0;
      forecaseWeather.textContent =
        Math.round(forecastData.tempmax) +
        "\u00B0" +
        "/" +
        Math.round(forecastData.tempmin) +
        "\u00B0";
    }
  });
};
