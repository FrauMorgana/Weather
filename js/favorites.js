import { SEARCH_TARGET_WEATHER_OBJECT } from "./main.js";
import { ICONS_SRC, ELEMENT, CLASS } from "./data.js";
import { getSavedList, saveFavList } from "./storage.js";

let FAV_CITIES = [];
const FAV_CITIES_STORAGE = getSavedList() || [];
const LIKE_BUTTON = document.querySelector(".like");

function likeInteraction() {
	const currentCityName = SEARCH_TARGET_WEATHER_OBJECT.name;
	const cityIndex = FAV_CITIES_STORAGE.indexOf(currentCityName);


	if (FAV_CITIES_STORAGE.includes(currentCityName)) {
		FAV_CITIES_STORAGE.splice(cityIndex, 1);
		deleteFromFavList(currentCityName);
	}
	else {
		FAV_CITIES_STORAGE.push(currentCityName);
		addToFavList(currentCityName);
	}

	saveFavList(FAV_CITIES_STORAGE);
	console.log(FAV_CITIES_STORAGE);
}

function likeIconUpdate(){
	(FAV_CITIES_STORAGE.find(item => item == SEARCH_TARGET_WEATHER_OBJECT.name)) ? 
		LIKE_BUTTON.src = ICONS_SRC.HERAT_BLACK :
		LIKE_BUTTON.src = ICONS_SRC.HEART;

	return LIKE_BUTTON;
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

 export {FAV_CITIES, LIKE_BUTTON, likeInteraction, likeIconUpdate, addToFavList, createElement};