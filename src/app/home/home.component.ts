import { Component, OnInit } from '@angular/core';

import { User, Agent, Delivery } from '../_models/index';
import { UserService, AgentService, DeliveryService } from '../_services/index';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    months: String[] = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
    years: Number[] = [];
    yearSelected: Number;
    monthSelected: Number;
    //agents: Agent[] = [];
    deliveries: Delivery[] = [];
    showTable: string = 'Agents';

    constructor(private userService: UserService,
                private agentService: AgentService,
                private deliveryService: DeliveryService,
                private router: Router,) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllAgents();
        this.years[0] = (new Date()).getFullYear();
        for(var i=1;i<11;i++) {
          this.years[i] = Number(this.years[0]) - i;
        }
    }

    deleteAgent(id: number) {
       this.agentService.delete(id).subscribe(() => { this.loadAllAgents() });
    }

    showEditScreen(user: User){
        localStorage.setItem('choosedUser', JSON.stringify(user));
        this.router.navigate(['/agent', user.id]);
    }

    private loadAllAgents() {
        this.userService.getAll().subscribe(users => {
          var usersWithAgent = [];
          for(var i = 0; i < users.length; i++){
            if(users[i].agent){
              usersWithAgent.push(users[i]);
            }
          }
          this.users = usersWithAgent;
        });
    }

    // Deliveries functions
    showDeliveries(delivieris: Delivery[]) {
      this.deliveries = delivieris;
      this.showTable = 'Deliveries';
    }

    yearSelect(yearSelected: number){
      this.yearSelected = yearSelected;
      if(this.monthSelected != null){

      }

    }

    monthSelect(monthSelected: number){
      this.monthSelected = monthSelected;
      if(this.yearSelected != null){
        let str = this.monthSelected.toString() + '/' +  this.yearSelected.toString();
      }
    }

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
