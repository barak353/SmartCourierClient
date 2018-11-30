﻿import { Component } from '@angular/core';
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
    choosedUserId: number;//courier id of the user that choosed.
    currentMonthInYear: string;
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
      this.currentMonthInYear = Month.currentMonthInYear;
      if(this.currentMonthInYear != null){
        let year = this.currentMonthInYear.substring(this.currentMonthInYear.length-4, this.currentMonthInYear.length);
        let month = this.currentMonthInYear.substring(0, this.currentMonthInYear.length-4);
        month = Month.monthMapInver.get(month);
        this.text =month + 'וחודש ' + year + ' הכנס משכורת עבור שנת';
        this.text =  'הכנסת משכורת עבור שנת ' + year + ' וחודש ' + month;
      }
      this.sub = this.route.params.subscribe(params => {
        let user = JSON.parse(localStorage.getItem('choosedUser'))
        let url = this.router.url;
        let userId = url.split('/')[2];
        if(userId != null){//it's update screen.
          this.choosedUserId = parseInt(userId);
          this.model.firstName = user.firstName;
          this.model.lastName = user.lastName;
          this.model.username = user.username;
          this.model.password = user.password;
          this.model.courier.Email = user.courier.Email;
          this.model.courier.Phone = user.courier.Phone;
          this.model.courier.preferredArea = user.courier.preferredArea;
          this.model.courier.currentTotalPaid = user.courier.currentTotalPaid;
          this.model.courier = user.courier;
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
        this.choosedUserId = -1; //'create' button was pressed because we don't have user id..
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