import { SEARCH_TARGET_WEATHER_OBJECT } from "./main.js";
import { ICONS_SRC, ELEMENT, CLASS } from "./data.js";
import { getSavedList, saveFavList } from "./storage.js";

let FAV_CITIES = getSavedList();
const LIKE_BUTTON = document.querySelector(".like");

function likeInteraction(){ 
	let objectClone = Object.assign({}, SEARCH_TARGET_WEATHER_OBJECT);

	if (FAV_CITIES.length  == 0){
		FAV_CITIES.push(objectClone);
		addToFavList(objectClone.name);
	}
	else if(FAV_CITIES.find(item => item.name == SEARCH_TARGET_WEATHER_OBJECT.name)){
		let filtered = FAV_CITIES.filter(item => item.name !== SEARCH_TARGET_WEATHER_OBJECT.name);
		FAV_CITIES = filtered;
		deleteFromFavList(objectClone.name);
	}
	else{
		FAV_CITIES.push(objectClone);
		addToFavList(objectClone.name);
	};
	
	saveFavList();

	console.log(FAV_CITIES);
}

function likeIconUpdate(){
	(FAV_CITIES.find(item => item.name == SEARCH_TARGET_WEATHER_OBJECT.name)) ? 
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