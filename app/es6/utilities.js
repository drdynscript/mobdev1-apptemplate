'use strict';

// Extensions
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, (match, number) => { 
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
            ;
        });
    };
}

// Ajax class
export class Ajax {

    static loadJsonByPromise(url) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open('GET', url, true);
            xhr.onload = () => {
                if(xhr.status === 200) {
                    var data = (!xhr.responseType)?JSON.parse(xhr.response):xhr.response;
                    resolve(data);
                } else {
                    reject(xhr.status);
                }
            };
            xhr.onerror = () => {
                reject(Error('Network Error!'));
            }
            xhr.send(null);
        });
    }

    static loadJsonPByPromise(url) {
        return new Promise((resolve, reject) => {
            var name = 'jsonp' + new Date().getTime();
            if (url.match(/\?/)) url += '&callback='+name;
            else url += '?callback='+name;
            
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            
            window[name] = (data) => {
                document.getElementsByTagName('head')[0].removeChild(script);
                script = null;
                delete window[name];
        
                resolve(data);
            };
        
            document.getElementsByTagName('head')[0].appendChild(script);
        });
    }
}