import { SEARCH_TARGET_WEATHER_OBJECT } from "./main.js";
import { FAV_CITIES, addToFavList } from "./favorites.js";

function saveCurrentCity() {
	let currentCity = JSON.stringify(SEARCH_TARGET_WEATHER_OBJECT);
	localStorage.setItem('now', currentCity);
}

function saveFavList() {
	let favList = JSON.stringify(FAV_CITIES);
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
		addToFavList(element.name)
	});
}

export {saveCurrentCity, saveFavList, getLastCity, getSavedList, renderSavedList};