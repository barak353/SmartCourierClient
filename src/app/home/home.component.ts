import { Component, OnInit } from '@angular/core';
import { User, Courier, Delivery, Month, Salary} from '../_models/index';
import { UserService, CourierService, DeliveryService, SalaryService } from '../_services/index';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    couriers: Courier[] = [];
    months: String[] = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
    years: Number[] = [];
    yearSelected: String;
    monthSelected: String;
    deliveries: Delivery[] = [];
    showTable: string = 'Couriers';

    constructor(private userService: UserService,
                private courierService: CourierService,
                private deliveryService: DeliveryService,
                private salaryService: SalaryService,
                private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        //Month.get_Instance(); //Singelton instance.
        this.loadAllCouriers();
        //Month.currentMonthInYear = null;
        //this.years[0] = (new Date()).getFullYear();
        //for(var i=1;i<11;i++) {
        //  this.years[i] = Number(this.years[0]) - i;
        //}
    }

    deleteCourier(id: number) {
       this.courierService.delete(id).subscribe(() => { this.loadAllCouriers() });
    }

    showEditScreen(user: User){
        localStorage.setItem('choosedUser', JSON.stringify(user));
        this.router.navigate(['/courier', user.id]);
    }

    private loadAllCouriers() {
        this.courierService.getAll().subscribe(couriers => {
        //  var allCouriers = [];
          //for(var i = 0; i < users.length; i++){
            //if(users[i].courier){
          //    allCouriers.push(users[i]);
            //}
        //  }
        var allCouriers = [];
        for(var i = 0; i < couriers.length; i++){
          allCouriers.push(couriers[i]);
      }
          this.couriers = allCouriers;
        });
    }

    // Deliveries functions
    showDeliveries(delivieris: Delivery[]) {
      this.deliveries = delivieris;
      this.showTable = 'Deliveries';
    }

    /*yearSelect(yearSelected: number){
      this.yearSelected = yearSelected.toString();
      if(this.monthSelected != null){
        this.updateTotalPaid(Month.monthMap.get(this.monthSelected.toString()) +  this.yearSelected.toString());
      }else{
        Month.currentMonthInYear = "";
        for(let courier of this.couriers){
           courier.currentTotalPaid = "";//clear previous input;
        }
      }
    }

    updateTotalPaid(selectedMonthInYear: string){
      Month.currentMonthInYear = selectedMonthInYear;
      this.salaryService.getByMonthInYear(selectedMonthInYear).subscribe(salariesPacked => {
        let salaries : any = salariesPacked;
        if(salaries != null && this.couriers != null){
          for(let courier of this.couriers){
          courier.currentTotalPaid = "";//clear previous input;
          if(salaries.length > 0){
            for(let salary of salaries) {
              for(let user of this.courier){
                if(courier != null && courier.id == salary.courier){//If user have courier.
                  courier.currentTotalPaid = salary.totalPaid;
                }
              }
            }
          }
        }
      }});
    }

    monthSelect(monthSelected: number){
      this.monthSelected = monthSelected.toString();
      if(this.yearSelected != null){
        this.updateTotalPaid(Month.monthMap.get(this.monthSelected.toString()) + this.yearSelected.toString());
      }else{
        Month.currentMonthInYear = "";
        for(let user of this.users){
          user.courier.currentTotalPaid = "";//clear previous input;
        }
      }
    }*/

    // createNewDelivery(){
    //   this.deliveryService.create(Delivery delivery).subscribe(() => { /*this.loadAllDelivery()*/ });
    // }
    //
    // updateDelivery(id : number){
    //   this.deliveryService.update(id).subscribe(() => { /*this.loadAllDeliveries()*/ });
    // }
    //
    // deleteDelivery(id: number) {
    //     this.deliveryService.delete(id).subscribe(() => { /*this.loadAllDeliveries()*/ });
    // }

    // private loadAllDeliveries() {
    //     this.deliveryService.getAll().subscribe(deliveries => { this.deliveries = deliveries; });
    // }


    // Users functions (example for register page)
    // updateUser(id : number){
    //   this.userService.update(id).subscribe(() => { this.loadAllUsers() });
    // }
    //
    // deleteUser(id: number) {
    //     this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    // }
    //
    // private loadAllUsers() {
    //     this.userService.getAll().subscribe(users => { this.users = users; });
    // }

}
