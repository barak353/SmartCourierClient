import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Courier, Region, Delivery } from '../_models/index';
import { AlertService, RegionService, AuthenticationService } from '../_services/index';
import { HomeComponent } from '../home/index';

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
    constructor(
        private authenticationService: AuthenticationService,
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

    fromAdressToLanAndAtt(){
      let adress = this.model.adress;
      latLng = this.authenticationService.getLanAtt(adress);
      alert(latLng);
    }


    createDeliveryInRegion()
    {
      this.fromAdressToLanAndAtt();
      this.loading = true;
      let delivery = new Delivery()
      delivery.name = this.model.name;
      delivery.isUrgent = this.model.isUrgent;
      delivery.latitude = this.model.latitude;
      delivery.longitude = this.model.longitude;
      /*this.regionService.createDeliveryInRegion(delivery, this.region.id).subscribe(
            data => {
              this.alertService.success('הוספת משלוח בוצעה בהצלחה', true);
              this.loading = false;
            }
          ,error => {
              this.alertService.error(error);
              this.loading = false;
          });*/
    }
  }
