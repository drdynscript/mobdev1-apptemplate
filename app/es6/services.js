'use strict';

export class YaHooWeatherService {

  static get URL_WOEID() { return 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D{0}%20AND%20u%3D%22{1}%22&format=json&diagnostics=true' };

  constructor() {
  }

  loadWeatherForWoeid = (woeid, unit) => {
    console.log('LOAD WEATHER FOR WOEID xddd'); 
  }
  
}