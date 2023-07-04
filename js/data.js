const ICONS_SRC = {
	HEART: './img/heart-shape.svg',
	HERAT_BLACK: './img/heart-shape-black.svg',
	SEARCH: './img/search.svg',
	TEMPERATURE: './img/temperature.ico',
	CLEAR: './img/weather-state/clear.svg',
	CLOUDS: './img/weather-state/clouds.svg',
	MIST: './img/weather-state/mist.svg',
	RAIN: './img/weather-state/rain.svg',
	SNOW: './img/weather-state/snow.svg',
	THUNDERSTORM: './img/weather-state/thunderstorm.svg',
}

const ELEMENT = {
	FAV_LIST: document.querySelector('.city-list-wrapper'),
	CITIES_ON_FAV_LIST: document.querySelectorAll('.fav-city'),
}

const CLASS = {
	FAV_CITY: 'fav-city',
}

const MONTHES = [
	"January", 
	"February", 
	"March", 
	"April", 
	"May", 
	"June", 
	"July", 
	"August", 
	"September", 
	"October", 
	"November", 
	"December"
]

export {ICONS_SRC, ELEMENT, CLASS, MONTHES};