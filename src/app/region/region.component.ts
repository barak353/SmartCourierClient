import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Courier, Region } from '../_models/index';
import { AlertService, CourierService, RegionService } from '../_services/index';
import { HomeComponent } from '../home/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'region.component.html'
})

export class RegionComponent{
    model: any = {region : Region };
    loading = false;
    choosedRegionId: number = -1 ;//The ID of the region that we choosed to assign courier to him.

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private courierService: CourierService,
        private regionService: RegionService,
        private alertService: AlertService) {
    }


    ngOnInit() {
      this.loading = false;
      this.route.params.subscribe(params => {
        let url = this.router.url;
        let regionId = url.split('/')[2];//We can get the region id from the URL.
        if(regionId != null){//If regionId is exist in the URL then it's update region screen.
          this.choosedRegionId = parseInt(regionId);
        }else//It's create region screen
        {
          this.choosedRegionId = -1;
        }
      });
    }

    createRegion(){
      this.loading = true;
      let region = new Region()
      region.regionName = this.model.regionName;
      region.threshold = this.model.threshold;
      this.regionService.createRegion(region).subscribe(
            data => {
              this.alertService.success('הוספת משלוח בוצעה בהצלחה', true);
              sessionStorage.setItem('showScreen', 'Region');//We want to back to home screen then initalize choosed region.
              this.router.navigate(['/']);
            }
          ,error => {
              this.alertService.error(error);
              this.loading = false;
          });
    }

    back(){
      sessionStorage.setItem('showScreen', 'Region');
      this.router.navigate(['/']);
    }
}
