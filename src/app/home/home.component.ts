﻿import { Component, OnInit } from '@angular/core';

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
        this.loadAllAgents();
    }


    // Agents functions
    createNewAgent(){
      this.agentService.create(Agent agent).subscribe(() => { this.loadAllAgents() });
    }

    updateAgent(id : number){
      this.agentService.update(id).subscribe(() => { this.loadAllAgents() });
    }

    deleteAgent(id: number) {
        this.agentService.delete(id).subscribe(() => { this.loadAllAgents() });
    }

    private loadAllAgents() {
        this.agentService.getAll().subscribe(agents => { this.agents = agents; });
    }


    // Deliveries functions
    showDeliveries(delivieris: Delivery[]) {
      this.deliveries = delivieris;
      this.showTable = 'Deliveries';
    }

    createNewDelivery(){
      this.deliveryService.create(Delivery delivery).subscribe(() => { /*this.loadAllDelivery()*/ });
    }

    updateDelivery(id : number){
      this.deliveryService.update(id).subscribe(() => { /*this.loadAllDeliveries()*/ });
    }

    deleteDelivery(id: number) {
        this.deliveryService.delete(id).subscribe(() => { /*this.loadAllDeliveries()*/ });
    }

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