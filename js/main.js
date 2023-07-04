import { ICONS_SRC, ELEMENT, MONTHES } from "./data.js";
import {FAV_CITIES, LIKE_BUTTON, likeInteraction, likeIconUpdate, addToFavList, createElement } from "./favorites.js";
import {saveCurrentCity, saveFavList, getLastCity, getSavedList, renderSavedList} from "./storage.js";

const serverUrl = "http://api.openweathermap.org/data/2.5/";
const weather = 'weather';
const FORECAST = 'forecast';
const apiKey = "ff9a92deb11480f9014deb01fb57bd09";
const DEFAULT_CITY = 'Rome';

const FORM = document.querySelector(".search-form");
const KELCIN_TO_CELSIUS = (k) => `${Math.round(k - 273.15)}°`;
const FORECAST_LIST = [];
const SEARCH_TARGET_WEATHER_OBJECT = {
	name: '',
	state: '',
	temp: '',
	feels_like: '',
	sunrise: '',
	sunset: '',
	icon: '',
};

document.addEventListener('DOMContentLoaded', onloadTab);
FORM.addEventListener('submit', formHandler);
LIKE_BUTTON.addEventListener('click', likeHandler);
ELEMENT.FAV_LIST.addEventListener('click', favListHandler);

function likeHandler(){
	likeInteraction();
	likeIconUpdate();
}

function onloadTab(){
	if (localStorage.length == 0){
		getWeatherData(serverUrl, weather, DEFAULT_CITY, apiKey);
		getWeatherData(serverUrl, FORECAST, DEFAULT_CITY, apiKey);
	}
	else {
		renderSavedList(getSavedList());
		getWeatherData(serverUrl, weather, getLastCity(), apiKey);
		getWeatherData(serverUrl, FORECAST, getLastCity(), apiKey);
		
	}
}

function formHandler(event) {
	event.preventDefault();
	
  	getWeatherData(serverUrl, weather, getCityName(), apiKey);
	getWeatherData(serverUrl, FORECAST, getCityName(), apiKey);
	clearInput();
}

function favListHandler(event){
	if (event.target.closest('.fav-city')){
		getWeatherData(serverUrl, weather, event.target.textContent, apiKey);
		getWeatherData(serverUrl, FORECAST, event.target.textContent, apiKey);
	} else return null;
}


function getWeatherData(serverUrl, end, cityName, apiKey) {
	const url = `${serverUrl}${end}?q=${cityName}&appid=${apiKey}`;
	if (end === weather){
		fetch(url)
			.then((response) => response.json())
			.then((weatherData) => SEARCH_TARGET_WEATHER(weatherData, SEARCH_TARGET_WEATHER_OBJECT))
			.then(() => renderNow())
			.then(() => saveCurrentCity())
			.then(() => likeIconUpdate())
			.then(() => renderDetails())
			.catch(error => alert(error.message));
	}
	else {
		fetch(url)
			.then((response) => response.json())
			.then(data => createForecastList(data, FORECAST_LIST))
			.then(() => renderForecast())
			.catch(error => alert(error.message));
	}
}

function getCityName() {
	let input = FORM.querySelector("input");
	let inputValue = input.value;
	return inputValue;
}

function clearInput(){
	let input = FORM.querySelector("input");
	input.value = '';
}

function SEARCH_TARGET_WEATHER(data, object) {
	object.name = data.name;
	object.state = data.weather[0].main;
	object.temp = KELCIN_TO_CELSIUS(data.main.temp);
	object.feels_like = KELCIN_TO_CELSIUS(data.main.feels_like);
	object.sunrise = calcLocalTime(data.sys.sunrise, data.timezone);
	object.sunset = calcLocalTime(data.sys.sunset, data.timezone);	
	object.icon = `./img/weather-state/${object.state}.svg`;

	return object;
}

function createForecastList(data, list) {
	list.splice(0, list.length);
	let listFromData = data.list;
	for (let item of listFromData) {
		let object = {};

		let date = new Date(item.dt * 1000);
		let month = date.getMonth();
		let state = item.weather[0].main;
		let temp = KELCIN_TO_CELSIUS(item.main.temp);
		let feels_like = KELCIN_TO_CELSIUS(item.main.feels_like);

		object.forecastDate = `${date.getDate()} ${MONTHES[month]}`;
		object.forecastTime = `${date.getHours()}`.padStart(2, '0') + `:` + `${date.getMinutes()}`.padStart(2, '0');
		object.forecastTemp = `Temperature: ${temp}`;
		object.forecastFeelsLike = `Feels like: ${feels_like}`;
		object.forecastState = state;
		object.forecastIcon = `./img/weather-state/${state}.svg`;
		object.name = data.city.name;

		list.push(object);
	}
	console.log(list);
}


function calcLocalTime(time, targetShift){
	let userTime = new Date();
	let userUTCshift = (userTime.getTimezoneOffset()) * 60 *1000;
	let calcTargetStamp = ((time * 1000) + userUTCshift + (targetShift * 1000));
	let targetDate = new Date(calcTargetStamp);
	let finalHours = targetDate.getHours();
	let finalMinutes = targetDate.getMinutes();
	let result = `${finalHours}`.padStart(2, '0') + `:` + `${finalMinutes}`.padStart(2, '0');

	return result;
}

function renderNow(){
	
	console.log(SEARCH_TARGET_WEATHER_OBJECT);

	let tab = document.querySelector("#Now");
 	let currentTemp = tab.querySelector(".temperature");
	let currentCity = tab.querySelector(".city-wrapper").querySelector(".active-city");
	let weatherIco = tab.querySelector(".icon");

	console.log(SEARCH_TARGET_WEATHER_OBJECT.state);

	currentTemp.textContent = SEARCH_TARGET_WEATHER_OBJECT.temp;
	currentCity.textContent = SEARCH_TARGET_WEATHER_OBJECT.name;
	weatherIco.src = SEARCH_TARGET_WEATHER_OBJECT.icon;
}

function renderDetails() {
	for (let key in SEARCH_TARGET_WEATHER_OBJECT) {
		let element = document.getElementById(key);
		if (element === null)
			continue;
		else
			element.textContent = SEARCH_TARGET_WEATHER_OBJECT[key];

		console.log(element);
	}	
}

function renderForecast(){
	clearElement('.forecast-wrapper');

	const city = document.querySelector(".forecast-city");
	city.textContent = FORECAST_LIST[0].name;

	const forecastWrapper = document.querySelector('.forecast-wrapper');

	for (let item of FORECAST_LIST) {
		let forecastItem = createElement('div', 'forecast-item');

		let forecastDate = createElement('span', 'forecastDate', item.forecastDate);
		let forecastTime = createElement('span', 'forecastTime', item.forecastTime);
		let forecastTemp = createElement('span', 'forecastTemp', item.forecastTemp);
		let forecastState = createElement('span', 'forecastState', item.forecastState);
		let forecastFeelsLike = createElement('span', 'forecastFeelsLike', item.forecastFeelsLike);
		let forecastIcon = createElement('img', 'forecastIcon', '', 'icon-item', item.forecastIcon);

		forecastItem.append(forecastDate, forecastTime, forecastTemp, forecastState, forecastFeelsLike, forecastIcon);
		forecastWrapper.append(forecastItem);
	};
}

function clearElement(elementKlass) {
	let element = document.querySelector(elementKlass);
	element.innerHTML = '';
}

export {SEARCH_TARGET_WEATHER_OBJECT};