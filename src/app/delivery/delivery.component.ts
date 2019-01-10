declare var require: any;
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Courier, Region, Delivery } from '../_models/index';
import { AlertService, RegionService, DeliveryService } from '../_services/index';
import { HomeComponent } from '../home/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Request-Method':  '*'
    //'Access-Control-Request-Headers': 'origin, x-requested-with'

  })
};

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'delivery.component.html'
})

export class DeliveryComponent{
    model: any = {delivery : Delivery };
    loading = false;
    regions: Region[] = [];//Save all region for adding delivery to region.
    region: Region = null;
    delivery: Delivery = null;
    latLng: any = {lat: Number, lng: Number};
    constructor(
      private deliveryService: DeliveryService,
        private route: ActivatedRoute,
        private router: Router,
        private regionService: RegionService,
        private alertService: AlertService) {
    }

    ngOnInit()
    {
      this.region = JSON.parse(sessionStorage.getItem('choosedRegion'));
      this.loadAllRegions()
      this.model.delivery = new Delivery();
    }

    private loadAllRegions()
    {
        this.regionService.getAll().subscribe(regions => {
          this.regions = regions;
        });
    }


    sendDeliveryToServer()
    {
      this.loading = true;
      let delivery = new Delivery()
      delivery.name = this.model.name;
      delivery.isUrgent = this.model.isUrgent;
      delivery.latitude = this.model.latitude;
      delivery.longitude = this.model.longitude;
      delivery.adress = this.model.adress;
      this.regionService.createDeliveryInRegion(delivery, this.region.id).subscribe(
            data => {
              this.alertService.success('הוספת משלוח בוצעה בהצלחה', true);
              this.loading = false;
            }
          ,error => {
              this.alertService.error(error);
              this.loading = false;
          });
    }

    createDeliveryInRegion()
    {
      this.fromAdressToLanAndAtt();

    }

    fromAdressToLanAndAtt(){
      let address = this.model.adress;
      let googleMapsUrl = 'https://maps.googleapis.com/maps/api/';
      let apiKey = 'insert-api-key';
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
             //console.log(JSON.parse(data));
            let location = {results: []};
            location = JSON.parse(data);
            if(location.results.length > 1) console.log("בבקשה הכנס כתובת מדויקת יותר.");
            else{
              if(location.results.length == 1){
                this.latLng = {"lat" : location.results[0].geometry.location.lat, "lng" : location.results[0].geometry.location.lng};
                this.model.latitude = this.latLng.lat;
                this.model.longitude = this.latLng.lng;
                this.sendDeliveryToServer();
              }
              else
                console.log("בבקשה הכנס כתובת תקינה");
            }
            //this.latLng = {"lat:" : data.results[0].geometry.location.lat, "lng:" : data.results[0].geometry.location.lng};
          });

        }).on("error", (err) => {
          console.log("Error: " + err.message);
        });
    }

  }
