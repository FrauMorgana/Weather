import { TARGET_WEATHER_OBJECT } from "./main.js";
import { ICONS_SRC, ELEMENT, CLASS } from "./data.js";
import { getSavedList, saveFavList } from "./storage.js";
import { addToFavList, deleteFromFavList} from "./render.js"

const FAV_CITIES_STORAGE = getSavedList() || [];

function likeInteraction() {
	const currentCityName = TARGET_WEATHER_OBJECT.name;
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
	(FAV_CITIES_STORAGE.find(item => item == TARGET_WEATHER_OBJECT.name)) ? 
		ELEMENT.LIKE_BUTTON.src = ICONS_SRC.HERAT_BLACK :
		ELEMENT.LIKE_BUTTON.src = ICONS_SRC.HEART;

	return ELEMENT.LIKE_BUTTON;
}


 export {likeInteraction, likeIconUpdate};