import { Component, OnInit } from '@angular/core';

import { User, Agent, Delivery } from '../_models/index';
import { UserService, AgentService, DeliveryService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    agents: Agent[] = [];
    deliveries: Delivery[] = [];
    showTable: string = 'Agents';

    constructor(private userService: UserService,
                private agentService: AgentService,
                private deliveryService: DeliveryService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        //this.loadAllUsers();
        this.loadAllAgents();
    }

    showDeliveries(delivieris: Delivery[]) {
      this.deliveries = delivieris;
      this.showTable = 'Deliveries';
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllAgents() {
        this.agentService.getAll().subscribe(agents => { this.agents = agents; });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}
