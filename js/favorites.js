import { TARGET_WEATHER_OBJECT } from "./main.js";
import { getSavedList, saveFavList } from "./storage.js";
import { addToFavList, deleteFromFavList} from "./render.js"

// const FAV_CITIES_STORAGE = getSavedList() || [];

// function likeInteraction() {
// 	const currentCityName = TARGET_WEATHER_OBJECT.name;
// 	const cityIndex = FAV_CITIES_STORAGE.indexOf(currentCityName);

// 	if (FAV_CITIES_STORAGE.includes(currentCityName)) {
// 		FAV_CITIES_STORAGE.splice(cityIndex, 1);
// 		deleteFromFavList(currentCityName);
// 	}
// 	else {
// 		FAV_CITIES_STORAGE.push(currentCityName);
// 		addToFavList(currentCityName);
// 	}
// 	saveFavList(FAV_CITIES_STORAGE);
// }

const FAV_CITIES_STORAGE = new Set(getSavedList());

function likeInteraction() {
	const currentCityName = TARGET_WEATHER_OBJECT.name;
	if (FAV_CITIES_STORAGE.has(currentCityName)) {
		FAV_CITIES_STORAGE.delete(currentCityName);
		deleteFromFavList(currentCityName);
	}
	else {
		FAV_CITIES_STORAGE.add(currentCityName);
		addToFavList(currentCityName);
	}
	saveFavList(FAV_CITIES_STORAGE);
}

 export {likeInteraction, FAV_CITIES_STORAGE};