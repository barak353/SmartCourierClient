import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Courier, Region } from '../_models/index';
import { AlertService, UserService, CourierService, RegionService } from '../_services/index';
import { HomeComponent } from '../home/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'courier.component.html'
})

export class CourierComponent{
    model: any = {courier : Courier };
    loading = false;
    choosedRegionId: number = -1 ;//The ID of the region that we choosed to assign courier to him.
    region: Region;
    formType: string;
    //regions: Region[] = [];//Save the courier regions after choosing to show his deliveries.
    choosedCourierName: string = "לא נבחר שליח";
    //choosedCourier: Courier;//Courier choosed to be edited.
    dropdownCourier: Courier;//Courier chossed from dropdown.
    couriers: Courier[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private courierService: CourierService,
        private regionService: RegionService,
        private alertService: AlertService) {
    }


    ngOnInit() {
      this.loading = false;
      let formType = sessionStorage.getItem('formType')
      switch(formType){
        case 'createCourier':
        this.formType = formType;
        break;
        case 'updateCourier':
        this.formType = formType;
        break;
        case 'assignCourier':
        this.formType = formType;
        this.region = JSON.parse(sessionStorage .getItem('choosedRegion'))
        break;
      }
    }

    addCourierToRegion(){
      if(this.choosedCourierName != "לא נבחר שליח")
      {
        this.regionService.assignCourierToRegion(this.choosedRegionId, this.dropdownCourier.id).subscribe(region => {
          this.region = region;
          //We back from assign courier to region and not from edit courier screen, then change it.
          this.regionService.getRegion(this.region).subscribe(region => { this.region = region; this.couriers = region.courier; });
          sessionStorage .setItem('choosedRegion', JSON.stringify(this.region))
          sessionStorage .setItem('choosedCourier', null)
          this.loading = true;
        });
        this.router.navigate(['/']);
        this.alertService.success('שליח שוייך בהצלחה לאזור', true);
      }
    }


    backFromAssignForm()
    {
      sessionStorage .setItem('showScreen', 'CourierInRegion')
      this.router.navigate(['/']);


    }

      createCourier() {

      }

    updateDropdownCourier(courier: Courier){
        this.choosedCourierName = courier.id + ' - ' + courier.email;
        this.dropdownCourier = courier;
    }
}
