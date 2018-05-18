import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Agent } from '../_models/index';
import { AlertService, UserService, AgentService } from '../_services/index';
import { HomeComponent } from '../home/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'agent.component.html'
})

export class AgentComponent{
    model: any = {agent : Agent };
    //model: any = {};
    //user: User;
    loading = false;
    areas = ['None', 'North', 'South', 'Center'];
    userChoosed: User;//The user to be editing.
    choosedUserId: number;//agent id of the user that choosed.
    private sub: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private agentService: AgentService,
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
          this.choosedUserId = -1; //'create' button was pressed because we don't have user id..
        });

      }

    /*ngOnInit() {
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

      }*/

      createAgent() {
          let user = new User()
          this.loading = true;
          user.agent = new Agent();
          user.firstName = this.model.firstName;
          user.lastName = this.model.lastName;
          user.username = this.model.username;
          user.password = this.model.password;
          user.agent.email = this.model.agent.email;
          user.agent.phone = this.model.agent.phone;
          user.agent.preferredArea = this.model.agent.preferredArea;
          user.agent.po = this.model.agent.po;
          user.agent.totalPaid = this.model.agent.totalPaid;
          console.log(JSON.stringify(this.model) );
          console.log(JSON.stringify(user) );
          console.log(JSON.stringify(user.agent) );

          this.userService.create(user)
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


    /*createAgent() {
        this.loading = true;

        this.agentService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('הוספת סוכן בוצעה בהצלחה', true);
                    this.router.navigate(['/']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }*/

    /*updateAgent() {
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
    }*/

    updateDropdownAreas(area){
        switch (area) {
      case 'A':
        this.model.agent.preferredArea = "אין";
          break;
      case 'B':
        this.model.agent.preferredArea = "מחוז הצפון";
        break;
      case 'C':
        this.model.agent.preferredArea = "מחוז חיפה";
        break;
      case 'D':
        this.model.agent.preferredArea = "מחוז תל אביב";
        break;
      case 'E':
        this.model.agent.preferredArea = "מחוז המרכז";
          break;
      case 'F':
        this.model.agent.preferredArea = "מחוז ירושלים";
          break;
      case 'G':
        this.model.agent.preferredArea = "מחוז הדרום";
          break;
      default:
      this.model.agent.preferredArea = "אין";
  }
      document.getElementById('areas-dropdown').innerHTML = this.model.agent.preferredArea;
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
