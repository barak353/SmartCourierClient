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
    regionId: number;//Save the region ID after choosing to show his deliveries.
    constructor(private userService: UserService,
                private courierService: CourierService,
                private deliveryService: DeliveryService,
                private regionService: RegionService,
                private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        if(localStorage.getItem('choosedCourier') != null){//If we back from edit or create courier then there is a saved courier in local storage.
          this.showScreen = 'Courier';
          localStorage.setItem('choosedCourier', null);//We are now in home screen then initalize choosed courier.
          this.loadAllCouriers();
        }
    }

    deleteCourier(id: number) {
       this.courierService.delete(id).subscribe(() => { this.loadAllCouriers() });
    }

    deleteRegion(id: number) {
       this.regionService.delete(id).subscribe(() => { this.loadAllRegions() });
    }

    showCourierEditScreen(courier: Courier){
        localStorage.setItem('choosedCourier', JSON.stringify(courier));
        this.router.navigate(['/courier', courier.id]);
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
    showDeliveriesInRegion(regionId: number, deliveries: Delivery[]) {
      this.deliveries = deliveries;
      this.showScreen = 'DeliveryInRegion';
      this.regionId = regionId;
      ///Load all region's deliveries
      this.deliveries = deliveries;
    }

    // Clicking on show courier's deliveries.
    showDeliveriesOfCourier(courierId: number, delivieris: Delivery[]) {
      this.deliveries = delivieris;
      this.showScreen = 'DeliveryOfCourier';
      this.courierId = courierId;
      ///Load all courier's regions
      this.regionService.getRegionsByCourierId(courierId).subscribe(regions => {
        this.regions = regions;
      });
    }
}
