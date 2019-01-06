import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Request-Method':  '*'
    //'Access-Control-Request-Headers': 'origin, x-requested-with'

  })
};

@Injectable()
export class AuthenticationService {
  private latLng: string;


    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.put<any>('http://localhost:8080/app/authenticate', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }


    getLanAtt(address: string) {
      let googleMapsUrl = 'https://maps.googleapis.com/maps/api/';
      let apiKey = 'AIzaSyB1zPXsprtP41UCI9zd30FZkwJf-U1p5Ao';
      //address = '1600+Amphitheatre+Parkway,+Mountain+View,+CA';
      //  return this.http.get(googleMapsUrl + 'geocode/json?address=' + address + '&key=' + apiKey, httpOptions);
      let latLng = {};

        const https = require('https');

        https.get(googleMapsUrl + 'geocode/json?address=' + address + '&key=' + apiKey, (resp) => {
          let data = '';

          // A chunk of data has been recieved.
          resp.on('data', (chunk) => {
            data += chunk;
            //data = JSON.parse('' + chunk);
            //var json = JSON.parse(data);
            //alert('lat: ' + json.results[0].geometry.location.lat + 'lng: ' + json.results[0].geometry.location.lng);
          });

          // The whole response has been received. Print out the result.
          resp.on('end', () => {
            console.log(JSON.parse(data));
            data = JSON.parse(data);
            this.latLng = {"lat:" : data.results[0].geometry.location.lat, "lng:" : data.results[0].geometry.location.lng};
          });

        }).on("error", (err) => {
          console.log("Error: " + err.message);
        });

        return latLng;
    }
}
