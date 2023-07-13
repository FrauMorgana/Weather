import { TARGET_WEATHER_OBJECT } from "./main.js";
import { getSavedList, saveFavList } from "./storage.js";
import { addToFavList, deleteFromFavList} from "./render.js"

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