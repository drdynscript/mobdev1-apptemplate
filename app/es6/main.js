'use strict';

import { YaHooWeatherService } from './services'

class App {
  constructor() {
    console.log('Constructor of the App class.');
  }

  init() {
    console.log('Initialize the application.');

    // Variables
    this._weatherData = null;

    // Create YaHooWeatherService object
    this._yahooWeatherService = new YaHooWeatherService();

    // Cache DOM-elements
    this._mainContainer = document.querySelector('.main-container');

    // Load weather for certain woeid
    this.loadWeatherDataForWoeid(12591774); // woeid from ghent
  }

  loadWeatherDataForWoeid(woeid) {
    this._yahooWeatherService.loadWeatherForWoeid(woeid, 'c')
      .then((data) => {
          this._weatherData = data;

          // Update the UI for the weather with use of the received data from the API
          this.updateWeatherUI();
      })
      .catch((reject) => {
          console.log(reject);
      });
  }

  updateWeatherUI() {
    if(this._mainContainer != null && this._mainContainer != undefined && this._weatherData != null) {
        let tempStr = '';
        tempStr += `
<div class="weather" data-lat="${ this._weatherData.query.results.channel.item.lat }" data-lng="${ this._weatherData.query.results.channel.item.long }" data-atmosphere-rising="${ this._weatherData.query.results.channel.atmosphere.rising }" data-wind-chill="${ this._weatherData.query.results.channel.wind.chill }">
<span class="current__condition-image"><i class="wi wi-yahoo-${ this._weatherData.query.results.channel.item.condition.code }"></i></span>
<div class="weather__current">
    <span class="current__temp">${ this._weatherData.query.results.channel.item.condition.temp }<span class="unit">°</span></span>
    <span class="current__condition-text">${ this._weatherData.query.results.channel.item.condition.text }</span>
    <div class="current__temp-highlow">
        <span class="current__temp-high">${ this._weatherData.query.results.channel.item.forecast[0].high }<span class="unit">°</span></span>
        <span class="current__temp-low">${ this._weatherData.query.results.channel.item.forecast[0].low }<span class="unit">°</span></span>
    </div>
</div> 
<div class="weather__current-details">
    <span class="current__humidity">${ this._weatherData.query.results.channel.atmosphere.humidity }<span class="unit">%</span><span class="label">Humidity</span></span>
    <span class="current__pressure">${ (this._weatherData.query.results.channel.atmosphere.pressure / 1000).toFixed(3) }<span class="unit">${ this._weatherData.query.results.channel.units.pressure.substring(1, 2) }</span><span class="label">Pressure</span></span>
    <span class="current__visibility">${ this._weatherData.query.results.channel.atmosphere.visibility }<span class="unit">${ this._weatherData.query.results.channel.units.distance }</span><span class="label">Visibility</span></span>
    <span class="astronomy__sunrise">${ this._weatherData.query.results.channel.astronomy.sunrise }<span class="label">Sunrise</span></span>
    <span class="astronomy__sunset">${ this._weatherData.query.results.channel.astronomy.sunset }<span class="label">Sunset</span></span>
    <div class="current__wind">
        <span class="wind__speed">${ this._weatherData.query.results.channel.wind.speed }<span class="unit">${ this._weatherData.query.results.channel.units.speed }</span><span class="label">Wind speed</span></span>
        <span class="wind__direction">${ this._weatherData.query.results.channel.wind.direction }</span>
    </div>
</div>
</div>           
</div>
        `;

        this._mainContainer.innerHTML = tempStr;
    }
  }
}
window.addEventListener('load', () => {
  const app = new App();
  app.init();
});