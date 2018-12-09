import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Courier, Month, Salary, Region } from '../_models/index';
import { AlertService, UserService, CourierService, SalaryService, RegionService } from '../_services/index';
import { HomeComponent } from '../home/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'region.component.html'
})

export class RegionComponent{
    model: any = {courier : Courier };
    loading = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private salaryService: SalaryService,
        private courierService: CourierService,
        private regionService: RegionService,
        private alertService: AlertService) {
    }


    ngOnInit() {
}

}
