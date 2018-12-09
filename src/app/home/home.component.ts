import { Component, OnInit } from '@angular/core';
import { User, Courier, Delivery, Month, Salary, Region} from '../_models/index';
import { UserService, CourierService, DeliveryService, SalaryService, RegionService } from '../_services/index';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;//Current loged user.
    couriers: Courier[] = [];//The list of couriers to show.
    deliveries: Delivery[] = [];//The courier's deliveries to show, or the deliveries of the selected region (depands on which screen we are at).
    showScreen: string = 'Menu';//Show couriers screen as defult.
    regionSelected: String;//Save the index of the region the user choose from the select box.
    regions: Region[] = [];//Save the courier regions after choosing to show his deliveries.
    courierId: number;//Save the courier ID after choosing to show his deliveries.
    region: Region;//Save the region after choosing to show his deliveries or couriers.
    constructor(private userService: UserService,
                private courierService: CourierService,
                private deliveryService: DeliveryService,
                private regionService: RegionService,
                private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        let showscreen = sessionStorage.getItem('showScreen');
       let choosedCourier = null;
        let choosedRegion = null;
        choosedCourier = sessionStorage.getItem('choosedCourier');
        choosedRegion = sessionStorage.getItem('choosedRegion');
        if( (choosedCourier != "undefined") && (choosedCourier != "null") ){//If we back from edit or create courier then there is a saved courier in local storage.
          this.showScreen = 'Courier';
          sessionStorage .setItem('choosedCourier', null);//We are now in home screen then initalize choosed courier.
          this.loadAllCouriers();
        }
        if( (choosedRegion != "undefined") && (choosedRegion != "null") && (showscreen == 'DeliveryInRegion')){//If we back from creat new delivery to region screen then there is a saved region in local storage.
          let parsedChoosedRegion = JSON.parse(choosedRegion);
          this.showScreen = 'DeliveryInRegion';
          this.showDeliveriesInRegion(parsedChoosedRegion);
          sessionStorage.setItem('choosedRegion', null);//We are now in home screen then initalize choosed courier.
          this.regionService.getRegion(this.region).subscribe(region => {
            this.region = region;
            this.deliveries = this.region.delivery;
            this.couriers = this.region.courier;
          });
        }
        if(  (choosedRegion != "undefined") && (choosedRegion!= "null") && (showscreen == 'CourierInRegion')){//If we back from assign courier to region screen then there is a saved region in local storage.
          let parsedChoosedRegion = JSON.parse(choosedRegion);
          this.showScreen = 'CourierInRegion';
          this.showCouriersInRegion(parsedChoosedRegion);
          sessionStorage.setItem('choosedRegion', null);//We are now in home screen then initalize choosed courier.
        }
    }

    deleteCourier(id: number) {
       this.courierService.delete(id).subscribe(() => { this.loadAllCouriers() });
    }

    deleteRegion(id: number) {
       this.regionService.delete(id).subscribe(() => { this.loadAllRegions() });
    }

    deleteDeliveryFromRegion(deliveryId: number){
      this.regionService.deleteDeliveryInRegion(this.region.id, deliveryId).subscribe(() =>{ this.loadAllDeliveries() });
    }

    unassignCourierToRegion(courier: Courier)
    {
          this.regionService.unassignCourierToRegion(this.region.id, courier.id).subscribe(() =>{
          this.regionService.getRegion(this.region).subscribe(region =>{ this.couriers = region.courier});
          });
    }

    showCourierCreateOrEditScreen(region: Region, courier :Courier){
      sessionStorage.setItem('choosedRegion', JSON.stringify(region));
      sessionStorage.setItem('choosedCourier', JSON.stringify(courier));//If courier is null then it's create screen.
    }

    showCourierAssignScreen(region: Region){
      sessionStorage.setItem('choosedRegion', JSON.stringify(region));
      sessionStorage.setItem('choosedCourier', null);
      this.router.navigate(['/courier', region.id]);
    }

    showCreateDeliveryInRegionScreen(region: Region)
    {
      sessionStorage.setItem('choosedRegion', JSON.stringify(region));
      this.router.navigate(['/delivery']);
    }

    showCreateNewRegion()
    {
      this.router.navigate(['/region']);
    }

    showEditRegion(region: Region)
    {
      this.router.navigate(['/region', JSON.stringify(region)]);
    }

    //Choosing region from select box.
    regionSelect(regionSelected: String){
      if(regionSelected == "")//Show deliveries from all regions.
      {
        this.deliveryService.getDeliveriesByCourier(this.courierId).subscribe(deliveries =>{
          this.deliveries = deliveries;
        });
      }else
      {
        for(var i = 0; i < this.regions.length; i++)
        {
          if(this.regions[i].regionName == regionSelected)
              var regionId = this.regions[i].id;
        }
        this.regionService.getCourierDeliveries(this.courierId , regionId).subscribe(deliveries =>{
            this.deliveries = deliveries;
        });
      }
    }

    changeScreen(screen: string)
    {
      switch(screen){
        case 'Courier':
          this.loadAllCouriers();
          break;
        case 'Region':
          this.loadAllRegions();
          break;
        case 'Delivery':
          this.loadAllDeliveries();
          break;
        }
        this.showScreen = screen;
    }

    private loadAllCouriers() {
        this.courierService.getAll().subscribe(couriers => {
        var allCouriers = [];
        for(var i = 0; i < couriers.length; i++){
          allCouriers.push(couriers[i]);
      }
          this.couriers = allCouriers;
        });
    }

    private loadAllRegions()
    {
        this.regionService.getAll().subscribe(regions => {
          this.regions = regions;
        });
    }

    private loadAllDeliveries()
    {
        this.deliveryService.getAll().subscribe(deliveries => {
          this.deliveries = deliveries;
        });
    }

    // Clicking on show region's deliveries.
    showDeliveriesInRegion(region: Region) {
      this.deliveries = region.delivery;
      this.showScreen = 'DeliveryInRegion';
      sessionStorage.setItem('showScreen', this.showScreen);
      this.region = region;
    }

    // Clicking on show region's couriers.
    showCouriersInRegion(region: Region) {
      this.couriers = region.courier;
      this.showScreen = 'CourierInRegion';
      sessionStorage.setItem('showScreen', this.showScreen);
      this.region = region;
    }

    // Clicking on show courier's deliveries.
    showDeliveriesOfCourier(courierId: number, delivieris: Delivery[]) {
      this.deliveries = delivieris;
      this.showScreen = 'DeliveryOfCourier';
      sessionStorage.setItem('showScreen', this.showScreen);
      this.courierId = courierId;
    }
}
