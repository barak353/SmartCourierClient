import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Courier, Month, Salary, Region } from '../_models/index';
import { AlertService, UserService, CourierService, SalaryService, RegionService } from '../_services/index';
import { HomeComponent } from '../home/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'courier.component.html'
})

export class CourierComponent{
    model: any = {courier : Courier };
    loading = false;
    areas = ['None', 'North', 'South', 'Center'];
    userChoosed: User;//The user to be editing.
    choosedRegionId: number = -1 ;//The ID of the region that we choosed to assign courier to him.
    currentMonthInYear: string;
    region: Region;
    text: string;
    private sub: any;
    regions: Region[] = [];//Save the courier regions after choosing to show his deliveries.
    choosedCourierName: string = "לא נבחר שליח";
    choosedCourier: Courier;
    isEditScreen: Number;
    couriers: Courier[];
    //dropDownChoosedRegionName: string = "לא נבחר אזור";
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private salaryService: SalaryService,
        private courierService: CourierService,
        private regionService: RegionService,
        private alertService: AlertService) {
    }


    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
        let url = this.router.url;
        let regionId = url.split('/')[2];//We can get the region id from the URL.
        if(regionId != null){//If courierId is exist in the URL then it's update screen.
          let region = JSON.parse(sessionStorage .getItem('choosedRegion'))//If the regionId is exist then its means that we saved the choosed region in local storage.
          this.isEditScreen = JSON.parse(sessionStorage .getItem('isEditScreen'));
          this.choosedRegionId = parseInt(regionId);
          this.region = region;
          /*this.model.courier.Email = courier.Email;
          this.model.courier.password = courier.password;
          this.model.courier.Phone = courier.Phone;
          this.model.courier.po = courier.po;
        }else{//it's create screen.
        this.model.courier = new Courier();
        this.model.firstName = null;
        this.model.lastName =  null;
        this.model.username = null;
        this.model.password = null;
        this.model.courier.Email = null;
        this.model.courier.Phone = null;
        this.model.courier.preferredArea = null;
        this.model.courier.currentTotalPaid = null;*/
      }});
       this.courierService.getAll().subscribe(couriers => {
        this.couriers = couriers;
      });
    }

    addCourierToRegion(){
      if(this.choosedCourierName != "לא נבחר שליח")
        this.regionService.addCourierToRegion(this.choosedRegionId, this.choosedCourier.id).subscribe(region => {
        });
        //We back from assign courier to region and not from edit courier screen, then change it.
        sessionStorage .setItem('choosedRegion', JSON.stringify(this.region))
        sessionStorage .setItem('choosedCourier', null)

    }

      createCourier() {
        /*  let user = new User()
          this.loading = true;
          user.courier = new Courier();
          user.firstName = this.model.firstName;
          user.lastName = this.model.lastName;
          user.username = this.model.username;
          user.password = this.model.password;
          user.courier.email = this.model.courier.email;
          user.courier.phone = this.model.courier.phone;
          user.courier.preferredArea = this.model.courier.preferredArea;
          user.courier.po = this.model.courier.po;
          if(this.currentMonthInYear != null){
            let salary = new Salary();
            salary.monthInYear = this.currentMonthInYear;
            salary.totalPaid = this.model.courier.currentTotalPaid;
            let salaries = new Array<Salary>();
            salaries[0] = salary;
            user.courier.salary = salaries;
          }

          this.userService.create(user)
              .subscribe(
                  data => {
                      this.alertService.success('הוספת סוכן בוצעה בהצלחה', true);
                      this.router.navigate(['/']);
                  },
                  error => {
                      this.alertService.error(error);
                      this.loading = false;
                  });*/
      }

    updateCourier() {
      let user = new User()
      this.loading = true;
      user.courier = new Courier();
      user.firstName = this.model.firstName;
      user.lastName = this.model.lastName;
      user.username = this.model.username;
      user.password = this.model.password;
      user.courier.email = this.model.courier.email;
      user.courier.phone = this.model.courier.phone;
      user.courier.preferredArea = this.model.courier.preferredArea;
      user.courier.po = this.model.courier.po;
      if(this.currentMonthInYear != null){
        let salary = new Salary();
        salary.monthInYear = this.currentMonthInYear;
        salary.totalPaid = this.model.courier.currentTotalPaid;
        let salaries = new Array<Salary>();
        salaries[0] = salary;
        //user.courier.salary = salaries;
      }

      this.userService.update(user)
          .subscribe(
              data => {
                  this.alertService.success('הוספת סוכן בוצעה בהצלחה', true);
                  this.router.navigate(['/']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
    }

    updateDropdownCourier(courier: Courier){
        this.choosedCourierName = courier.id + ' - ' + courier.email;
        this.choosedCourier = courier;
    }


}
