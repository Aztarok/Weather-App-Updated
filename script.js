const apikey = "4a7525864fac453daea3854f0678017c";

const weatherDataElement = document.getElementById("weather-data");
const cityInputElement = document.getElementById("city-input");
const formElement = document.querySelector("form");

formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInputElement.value;
    getWeatherData(city);
});

async function getWeatherData(city) {
    try {
        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=imperial`
        );

        if (!response.ok) {
            throw new Error("Network response was not OK");
        }

        const data = await response.json();

        console.log(data);

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        console.log(icon);
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ];

        weatherDataElement.querySelector(".icon").innerHTML = `<img
        src="http://openweathermap.org/img/wn/${icon}.png"
        alt="Weather Icon"
        />`;

        weatherDataElement.querySelector(
            ".temperature"
        ).textContent = `${temperature}°F`;

        weatherDataElement.querySelector(
            ".description"
        ).textContent = `${description}`;

        weatherDataElement.querySelector(".details").innerHTML = details
            .map((detail) => `<div>${detail}</div>`)
            .join("");
    } catch (error) {
        weatherDataElement.querySelector(".icon").innerHTML = "";

        weatherDataElement.querySelector(".temperature").textContent = "";

        weatherDataElement.querySelector(".description").textContent =
            "An error occurred, please try again";

        weatherDataElement.querySelector(".details").innerHTML = "";
    }
}
