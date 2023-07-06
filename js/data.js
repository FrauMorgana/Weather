const DATA = {
	SERVER_URL: "https://api.openweathermap.org/data/2.5/",
 	WEATHER: 'weather',
 	FORECAST: 'forecast',
 	APIKEY: "ff9a92deb11480f9014deb01fb57bd09",
 	DEFAULT_CITY: 'Rome',
	KELCIN_TO_CELSIUS: (k) => `${Math.round(k - 273.15)}°`,
}

const ICONS_SRC = {
	HEART: './img/heart-shape.svg',
	HERAT_BLACK: './img/heart-shape-black.svg',
	SEARCH: './img/search.svg',
	TEMPERATURE: './img/temperature.ico',
	CLEAR: './img/weather-state/clear.svg',
	CLOUDS: './img/weather-state/clouds.svg',
	MIST: './img/weather-state/mist.svg',
	RAIN: './img/weather-state/rain.svg',
	SNOW: './img/weather-state/snow.svg',
	THUNDERSTORM: './img/weather-state/thunderstorm.svg',
}

const ELEMENT = {
	FAV_LIST: document.querySelector('.city-list-wrapper'),
	CITIES_ON_FAV_LIST: document.querySelectorAll('.fav-city'),
	FORM: document.querySelector(".search-form"),
	INPUT: document.querySelector("input"),
	LIKE_BUTTON: document.querySelector(".like"),
	TEMPERATURE_NOW: document.querySelector("#Now").querySelector(".temperature"),
	CITY_NOW: document.querySelector("#Now").querySelector(".city-wrapper").querySelector(".active-city"),
	WEATHER_ICO_NOW: document.querySelector("#Now").querySelector(".icon"),
	CITY_FORECAST: document.querySelector(".forecast-city"),
	FORECAST_WRAPPER: document.querySelector('.forecast-wrapper'),
}

const CLASS = {
	FAV_CITY: 'fav-city',
	FORECAST_ITEM: 'forecast-item',
	FORECAST_DATE: 'forecastDate',
	FORECAST_TIME: 'forecastTime',
	FORECAST_TEMP: 'forecastTemp',
	FORECAST_STATE: 'forecastState',
	FORECAST_FEELS_LIKE: 'forecastFeelsLike',
	FORECAST_ICON: 'forecastIcon',	
}

const MONTHES = [
	"January", 
	"February", 
	"March", 
	"April", 
	"May", 
	"June", 
	"July", 
	"August", 
	"September", 
	"October", 
	"November", 
	"December"
]

export {ICONS_SRC, ELEMENT, CLASS, MONTHES, DATA};