import { TARGET_WEATHER_OBJECT } from "./main.js";
import { addToFavList } from "./render.js";

function saveCurrentCity() {
	let currentCity = JSON.stringify(TARGET_WEATHER_OBJECT);
	localStorage.setItem('now', currentCity);
}

function saveFavList(list) {
	let favList = JSON.stringify(list);
	localStorage.setItem('list', favList);
}

function getLastCity() {
	let cityObject = JSON.parse(localStorage.getItem('now'));
	let lastCity = cityObject.name;
	return lastCity;
}

function getSavedList() {
	let lastList = JSON.parse(localStorage.getItem('list'));
	return lastList;
}

function renderSavedList(list) {
	list.forEach(element => {
		addToFavList(element)
	});
}

export {saveCurrentCity, saveFavList, getLastCity, getSavedList, renderSavedList};