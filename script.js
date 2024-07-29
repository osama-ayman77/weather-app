const apiKey = "b336d4901242b02525c432d5053c1482";

const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-icon");
const tempEl = document.querySelector(".temp");
const cityEl = document.querySelector(".city");
const humidityEl = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");
const weatherEl = document.querySelector(".weather");
const errorEl = document.querySelector(".error");

async function checkWeather(cityName) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );
    if (response.status == 404) throw new Error("No Data Found");
    const data = await response.json();

    const city = data.name;
    const temp = `${Math.round(data.main.temp)}°C`;
    const humidity = `${data.main.humidity}%`;
    const windSpeed = `${data.wind.speed}`;
    const status = data.weather[0].main.toLowerCase();
    console.log(status);

    tempEl.innerHTML = temp;
    cityEl.innerHTML = city;
    humidityEl.innerHTML = humidity;
    windEl.innerHTML = windSpeed;
    weatherIcon.src = `images/${status}.png`;
    weatherEl.style.display = "block";
    errorEl.style.display = "none";
  } catch (error) {
    weatherEl.style.display = "none";
    errorEl.style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchInput.value);
});
