import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Courier, Month, Salary } from '../_models/index';
import { AlertService, UserService, CourierService, SalaryService } from '../_services/index';
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
    choosedCourierId: number;//The ID of the courier that choosed to be edit.
    currentMonthInYear: string;
    courier: Courier;
    text: string;
    private sub: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private salaryService: SalaryService,
        private courierService: CourierService,
        private alertService: AlertService) {
    }


    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
        let url = this.router.url;
        let courierId = url.split('/')[2];//We can get the courier id from the URL.
        if(courierId != null){//If courierId is exist in the URL then it's update screen.
          let courier = JSON.parse(localStorage.getItem('choosedCourier'))//If the courierId is exist then its means that we saved the choosed courier in local storage.
          this.choosedCourierId = parseInt(courierId);
          this.courier = courier;
          this.model.courier.Email = courier.Email;
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
        this.model.courier.currentTotalPaid = null;
      }});
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

    updateDropdownAreas(area){
        switch (area) {
      case 'A':
        this.model.courier.preferredArea = "אין";
          break;
      case 'B':
        this.model.courier.preferredArea = "מחוז הצפון";
        break;
      case 'C':
        this.model.courier.preferredArea = "מחוז חיפה";
        break;
      case 'D':
        this.model.courier.preferredArea = "מחוז תל אביב";
        break;
      case 'E':
        this.model.courier.preferredArea = "מחוז המרכז";
          break;
      case 'F':
        this.model.courier.preferredArea = "מחוז ירושלים";
          break;
      case 'G':
        this.model.courier.preferredArea = "מחוז הדרום";
          break;
      default:
      this.model.courier.preferredArea = "אין";
  }
      document.getElementById('areas-dropdown').innerHTML = this.model.courier.preferredArea;
    }
}
