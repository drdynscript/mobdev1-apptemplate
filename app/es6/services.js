'use strict';

import { Ajax } from './utilities';

export class YaHooWeatherService {

  get URL_WOEID() { return 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D{0}%20AND%20u%3D%22{1}%22&format=json&diagnostics=true' };

  constructor() {
  }

  loadWeatherForWoeid = (woeid, unit) => {
    const URL = this.URL_WOEID.format(woeid, unit);
    return Ajax.loadJsonByPromise(URL);
  }
  
}