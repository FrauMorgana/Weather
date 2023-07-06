import { DATA, ELEMENT, MONTHES } from "./data.js";
import {likeInteraction, } from "./favorites.js";
import {saveCurrentCity, saveFavList, getLastCity, getSavedList, renderSavedList} from "./storage.js";
import { renderNow, renderDetails, renderForecast, likeIconUpdate } from "./render.js";

const FORECAST_LIST = [];
const TARGET_WEATHER_OBJECT = {};

document.addEventListener('DOMContentLoaded', onloadTab);
ELEMENT.FORM.addEventListener('submit', formHandler);
ELEMENT.FAV_LIST.addEventListener('click', favListHandler);
ELEMENT.LIKE_BUTTON.addEventListener('click', likeHandler);


function onloadTab(){
	if (localStorage.length < 2){
		getWeatherData(DATA.SERVER_URL, DATA.WEATHER, DATA.DEFAULT_CITY, DATA.APIKEY);
		getWeatherData(DATA.SERVER_URL, DATA.FORECAST, DATA.DEFAULT_CITY, DATA.APIKEY);
	}
	else {
		renderSavedList(getSavedList());
		getWeatherData(DATA.SERVER_URL, DATA.WEATHER, getLastCity(), DATA.APIKEY);
		getWeatherData(DATA.SERVER_URL, DATA.FORECAST, getLastCity(), DATA.APIKEY);
	}
}

function formHandler(event) {
	event.preventDefault();
  	getWeatherData(DATA.SERVER_URL, DATA.WEATHER, ELEMENT.INPUT.value, DATA.APIKEY);
	getWeatherData(DATA.SERVER_URL, DATA.FORECAST, ELEMENT.INPUT.value, DATA.APIKEY);
	clearInput();
}

function favListHandler(event){
	if (event.target.closest('.fav-city')){
		getWeatherData(DATA.SERVER_URL, DATA.WEATHER, event.target.textContent, DATA.APIKEY);
		getWeatherData(DATA.SERVER_URL, DATA.FORECAST, event.target.textContent, DATA.APIKEY);
	} else return null;
}

function likeHandler(){
	likeInteraction();
	likeIconUpdate();
}

function getWeatherData(serverUrl, end, cityName, apiKey) {
	const url = `${serverUrl}${end}?q=${cityName}&appid=${apiKey}`;
	if (end === DATA.WEATHER){
		fetch(url)
			.then((response) => response.json())
			.then((weatherData) => createWeatherObject(weatherData, TARGET_WEATHER_OBJECT))
			.then(() => renderNow())
			.then(() => renderDetails())
			.then(() => saveCurrentCity())
			.then(() => likeIconUpdate())
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

function clearInput(){
	ELEMENT.INPUT.value = '';
}

function createWeatherObject(data, object) {
	object.name = data.name;
	object.state = data.weather[0].main;
	object.temp = DATA.KELCIN_TO_CELSIUS(data.main.temp);
	object.feels_like = DATA.KELCIN_TO_CELSIUS(data.main.feels_like);
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
		let temp = DATA.KELCIN_TO_CELSIUS(item.main.temp);
		let feels_like = DATA.KELCIN_TO_CELSIUS(item.main.feels_like);

		object.forecastDate = `${date.getDate()} ${MONTHES[month]}`;
		object.forecastTime = `${date.getHours()}`.padStart(2, '0') + `:` + `${date.getMinutes()}`.padStart(2, '0');
		object.forecastTemp = `Temperature: ${temp}`;
		object.forecastFeelsLike = `Feels like: ${feels_like}`;
		object.forecastState = state;
		object.forecastIcon = `./img/weather-state/${state}.svg`;
		object.name = data.city.name;

		list.push(object);
	}
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


export {TARGET_WEATHER_OBJECT, FORECAST_LIST};