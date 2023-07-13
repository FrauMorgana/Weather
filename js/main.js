import { DATA, ELEMENT, MONTHES, WeatherObject } from "./data.js";
import {likeInteraction, } from "./favorites.js";
import {saveCurrentCity, getLastCity, getSavedList, renderSavedList} from "./storage.js";
import { renderNow, renderDetails, renderForecast, likeIconUpdate } from "./render.js";

const FORECAST_LIST = [];
const TARGET_WEATHER_OBJECT = new WeatherObject();

document.addEventListener('DOMContentLoaded', onloadTab);
ELEMENT.FORM.addEventListener('submit', formHandler);
ELEMENT.FAV_LIST.addEventListener('click', favListHandler);
ELEMENT.LIKE_BUTTON.addEventListener('click', likeHandler);


function onloadTab(){
	if (localStorage.length < 2){
		getWeatherData(DATA.SERVER_URL, DATA.WEATHER, TARGET_WEATHER_OBJECT.name, DATA.APIKEY);
		getWeatherData(DATA.SERVER_URL, DATA.FORECAST, TARGET_WEATHER_OBJECT.name, DATA.APIKEY);
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
			.catch(error => alert(error));
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
	const listFromData = data.list;
	for (let item of listFromData) {
		const date = new Date(item.dt * 1000);
		const month = date.getMonth();
		const state = item.weather[0].main;
		const temp = DATA.KELCIN_TO_CELSIUS(item.main.temp);
		const feels_like = DATA.KELCIN_TO_CELSIUS(item.main.feels_like);

		const object = new WeatherObject(
			data.city.name,
			state,
			`Temperature: ${temp}`,
			`Feels like: ${feels_like}`,
			`./img/weather-state/${state}.svg`,
			'',
			'',
			`${date.getDate()} ${MONTHES[month]}`,
			date.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})
		);

		list.push(object);
	}
}

function calcLocalTime(time, targetShift){
	const userTime = new Date();
	const userUTCshift = (userTime.getTimezoneOffset()) * 60 *1000;
	const calcTargetStamp = ((time * 1000) + userUTCshift + (targetShift * 1000));
	const targetDate = new Date(calcTargetStamp);
	const result = targetDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
	return result;
}


export {TARGET_WEATHER_OBJECT, FORECAST_LIST};