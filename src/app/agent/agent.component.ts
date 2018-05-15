import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Agent } from '../_models/index';
import { AlertService, UserService } from '../_services/index';
import { HomeComponent } from '../home/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'agent.component.html'
})

export class AgentComponent{
    model: any = {agent : Agent };
    loading = false;
    areas = ['None', 'North', 'South', 'Center'];
    userChoosed: User;//The user to be editing.
    choosedUserId: number;//agent id of the user that choosed.
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
        let user = JSON.parse(localStorage.getItem('choosedUser'))
        let url = this.router.url;
        let userId = url.split('/')[2];
        if(userId != null){
          this.choosedUserId = parseInt(userId);
          this.model.firstName = user.firstName;
          this.model.lastName = user.lastName;
          this.model.username = user.username;
          this.model.password = user.password;
          this.model.Email = user.Email;
          this.model.Phone = user.Phone;
          this.model.preferredArea = user.preferredArea;
          this.model.totalPaid = user.Phone;
          this.model.agent = user.agent;
        }
        else
          this.choosedUserId = -1; //'new' button was pressed because we don't have user id..
        });

        }

    createAgent() {
        this.loading = true;
        this.userService.create(this.model)
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

    updateAgent() {
        this.loading = true;
        this.userService.update(this.model)
            .subscribe(
                data => {
                    this.alertService.success('עידכון נתוני סוכן הסתיים בהצלחה', true);
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
