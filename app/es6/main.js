'use strict';

import { YaHooWeatherService } from './services'

class App {
  constructor() {
    console.log('Constructor of the App class.');
  }

  init = () => {
    console.log('Initialize the application.');
  }
}
window.addEventListener('load', () => {
  const app = new App();
  app.init();
});