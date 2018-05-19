import { Component, OnInit } from '@angular/core';
import { User, Agent, Delivery } from '../_models/index';
import { UserService, AgentService, DeliveryService } from '../_services/index';
import { Router } from '@angular/router';
import { TSMap } from "typescript-map"

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    months: String[] = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
    years: Number[] = [];
    yearSelected: String;
    monthSelected: String;
    monthInYear: String;
    monthMap: TSMap<string,string>;//Installed using angular-cli/
    //agents: Agent[] = [];
    deliveries: Delivery[] = [];
    showTable: string = 'Agents';

    constructor(private userService: UserService,
                private agentService: AgentService,
                private deliveryService: DeliveryService,
                private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.monthMap = new TSMap<string,string>();
        this.monthMap.set('ינואר','january');
        this.monthMap.set('פברואר','february');
        this.monthMap.set('מרץ','march');
        this.monthMap.set('אפריל','april');
        this.monthMap.set('מאי','may');
        this.monthMap.set('יוני','june');
        this.monthMap.set('יולי','july');
        this.monthMap.set('אוגוסט','august');
        this.monthMap.set('ספטמבר','september');
        this.monthMap.set('אוקטובר','october');
        this.monthMap.set('נובמבר','november');
        this.monthMap.set('דצמבר','december');

        //monthDic['ינואר'] = 'january';
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
      this.yearSelected = yearSelected.toString();
      if(this.monthSelected != null){
        this.monthInYear = this.monthSelected.toString() + '/' +  this.yearSelected.toString();
        this.updateTotalPaid();
      }

    }

    updateTotalPaid(){


    }

    monthSelect(monthSelected: number){
      this.monthSelected = monthSelected.toString();
      if(this.yearSelected != null){
        this.monthInYear = this.monthSelected.toString() + '/' +  this.yearSelected.toString();
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
