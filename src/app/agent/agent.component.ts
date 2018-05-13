import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Agent } from '../_models/index';
import { AlertService, UserService } from '../_services/index';
import { HomeComponent } from '../index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'agent.component.html'
})

export class AgentComponent implements OnInit {
    model: any = {agent : Agent };
    loading = false;
    areas = ['None', 'North', 'South', 'Center'];
    id: number;//Agent id to be editing.
    private sub: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
          //this.model.agent = {};
    }

    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
      if(params['id'] != null)
        this.id = params['id']; //Edit button of agent number 'id' was pressed.
      else
        this.id = -1; //Assume that 'new' button was pressed.
      });
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

    updateAgent() {
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
