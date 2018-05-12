import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, AgentService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'agent.component.html'
})

export class AgentComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private agentervice: AgentService,
        private alertService: AlertService) { }

    createAgent() {
        this.loading = true;
        this.agentService.create(this.model)
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
