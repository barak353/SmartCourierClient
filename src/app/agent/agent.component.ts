import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User, Agent } from '../_models/index';
import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'agent.component.html'
})

export class AgentComponent {
    model: any = {agent : Agent };
    loading = false;
    areas = ['None', 'North', 'South', 'Center'];

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
          //this.model.agent = {};
    }

    ngOnInit() {
        this.model.agent.preferredArea = 'None';
    }

    createAgent() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    updateDropdownAreas(area){
      document.getElementById('areas-dropdown').innerHTML = area;
      this.model.agent.preferredArea = area;
    }

    // updateAgent(id: number) {
    //     this.loading = true;
    //     this.agentService.create(this.model)
    //         .subscribe(
    //             data => {
    //                 this.alertService.success('Registration successful', true);
    //                 this.router.navigate(['/login']);
    //             },
    //             error => {
    //                 this.alertService.error(error);
    //                 this.loading = false;
    //             });
    // }
}
