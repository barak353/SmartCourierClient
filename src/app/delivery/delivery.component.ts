import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { User, Agent, Month, Salary } from '../_models/index';
import { AlertService } from '../_services/index';
import { HomeComponent } from '../home/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'delivery.component.html'
})
/*
*יש אפשרות להוסיף ידנית משלוחים לסוכנים על ידי המזכירה
*וצריך לעשות מסך נפרד להוספת משלוחים לפי אזורים גם ידנית על ידי המזכירה אבל שהמשלוח לא ישוייך לשום סוכן
*ואז בסרבר יופעל על השליחויות שאין להם שום סוכן האלגוריתם של הדבורים כאשר המזכירה תבקש בגוי להפעיל את האלגוריתם הזה עבור סוכן מסויים.
*ואז מה שיקרה זה שלסוכן הזה ירשמו כל השליחויות שחזרו כרשימה מהאלגוריתם הדבורים.
* אז קיבלנו שני אפשרויות לשייוך שליחויות לסוכנים, אחד ידנית על ידי המזכירה והשני במסך אחר שנעשה על ידי הכנסת שליחויות באופן כללי ואז שהסרבר יריץ על כל השליחויות שבסרבר שלא משוייכים לסוכן וישייך את השליחויות שיצאו לסוכן שעליו הופעל האלגוריתם וזה יעשה על פי בקשה מהמזכירה להפעיל את האלגוריתם על סוכן מסויים.
*/
export class DeliveryComponent{
    /*model: any = {agent : Agent };
    loading = false;
    areas = ['None', 'North', 'South', 'Center'];
    userChoosed: User;//The user to be editing.
    choosedUserId: number;//agent id of the user that choosed.
    currentMonthInYear: string;
    text: string;
    private sub: any;*/

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        //private userService: UserService,
        //private salaryService: SalaryService,
        //private agentService: AgentService,
        private alertService: AlertService) {
    }


    /*ngOnInit() {
      this.currentMonthInYear = Month.currentMonthInYear;
      if(this.currentMonthInYear != null){
        let year = this.currentMonthInYear.substring(this.currentMonthInYear.length-4, this.currentMonthInYear.length);
        let month = this.currentMonthInYear.substring(0, this.currentMonthInYear.length-4);
        month = Month.monthMapInver.get(month);
        this.text =month + 'וחודש ' + year + ' הכנס משכורת עבור שנת';
        this.text =  'הכנסת משכורת עבור שנת ' + year + ' וחודש ' + month;
      }
      this.sub = this.route.params.subscribe(params => {
        let user = JSON.parse(localStorage.getItem('choosedUser'))
        let url = this.router.url;
        let userId = url.split('/')[2];
        if(userId != null){//it's update screen.
          this.choosedUserId = parseInt(userId);
          this.model.firstName = user.firstName;
          this.model.lastName = user.lastName;
          this.model.username = user.username;
          this.model.password = user.password;
          this.model.agent.Email = user.agent.Email;
          this.model.agent.Phone = user.agent.Phone;
          this.model.agent.preferredArea = user.agent.preferredArea;
          this.model.agent.currentTotalPaid = user.agent.currentTotalPaid;
          this.model.agent = user.agent;
        }else{//it's create screen.
        this.model.agent = new Agent();
        this.model.firstName = null;
        this.model.lastName =  null;
        this.model.username = null;
        this.model.password = null;
        this.model.agent.Email = null;
        this.model.agent.Phone = null;
        this.model.agent.preferredArea = null;
        this.model.agent.currentTotalPaid = null;
        this.choosedUserId = -1; //'create' button was pressed because we don't have user id..
      }});
    }

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
          if(this.currentMonthInYear != null){
            let salary = new Salary();
            salary.monthInYear = this.currentMonthInYear;
            salary.totalPaid = this.model.agent.currentTotalPaid;
            let salaries = new Array<Salary>();
            salaries[0] = salary;
            user.agent.salary = salaries;
          }

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

    updateAgent() {
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
      if(this.currentMonthInYear != null){
        let salary = new Salary();
        salary.monthInYear = this.currentMonthInYear;
        salary.totalPaid = this.model.agent.currentTotalPaid;
        let salaries = new Array<Salary>();
        salaries[0] = salary;
        user.agent.salary = salaries;
      }

      this.userService.update(user)
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
    }*/
}
