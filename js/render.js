import {FORECAST_LIST, TARGET_WEATHER_OBJECT} from "./main.js"
import { CLASS, ELEMENT } from "./data.js";

function renderNow(){
	ELEMENT.TEMPERATURE_NOW.textContent = TARGET_WEATHER_OBJECT.temp;
	ELEMENT.CITY_NOW.textContent = TARGET_WEATHER_OBJECT.name;
	ELEMENT.WEATHER_ICO_NOW.src = TARGET_WEATHER_OBJECT.icon;
}

function renderDetails() {
	for (let key in TARGET_WEATHER_OBJECT) {
		let element = document.getElementById(key);
		if (element === null)
			continue;
		else
			element.textContent = TARGET_WEATHER_OBJECT[key];
	}	
}

function renderForecast(){
	ELEMENT.FORECAST_WRAPPER.innerHTML = '';
	ELEMENT.CITY_FORECAST.textContent = FORECAST_LIST[0].name;

	for (let item of FORECAST_LIST) {
		let forecastItem = createElement('div', CLASS.FORECAST_ITEM);

		let forecastDate = createElement('span', CLASS.FORECAST_DATE, item.forecastDate);
		let forecastTime = createElement('span', CLASS.FORECAST_TIME, item.forecastTime);
		let forecastTemp = createElement('span', CLASS.FORECAST_TEMP, item.forecastTemp);
		let forecastState = createElement('span', CLASS.FORECAST_STATE, item.forecastState);
		let forecastFeelsLike = createElement('span', CLASS.FORECAST_FEELS_LIKE, item.forecastFeelsLike);
		let forecastIcon = createElement('img', CLASS.FORECAST_ICON, '', 'icon-item', item.forecastIcon);

		forecastItem.append(forecastDate, forecastTime, forecastTemp, forecastState, forecastFeelsLike, forecastIcon);
		ELEMENT.FORECAST_WRAPPER.append(forecastItem);
	};
}

function createElement(
	tag,
	className,
	textContent = '',
	alt = '',
	src = ''
 ){
	const element = document.createElement(tag);
	element.className = className;
	element.textContent = textContent;
	element.alt = alt;
	element.src = src;
	return element;
 };

 function addToFavList(cityName){
	let favCity = createElement('li', CLASS.FAV_CITY, cityName);
	favCity.setAttribute('id', cityName);
	ELEMENT.FAV_LIST.prepend(favCity);
 }

 function deleteFromFavList(cityName){
	let favCity = document.getElementById(cityName);
	favCity.remove();
 }

export {renderNow, renderDetails, renderForecast, addToFavList, deleteFromFavList};