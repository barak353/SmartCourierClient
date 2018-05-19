import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Salary } from '../_models/index';

@Injectable()
export class SalaryService {
    constructor(private http: HttpClient) { }
    baseUrl = 'http://localhost:8080';
    // getAll() {
    //     return this.http.get<Salary[]>('/api/deliveries');
    // }

    getAll() {
        return this.http.get<Salary[]>('http://localhost:8080/salary/getAll');
    }

    getByMonthInYear(monthInYear: String) {
        return this.http.get(this.baseUrl + '/salary/getByMonthInYear/' + monthInYear);
    }

    /*create(salary: Salary) {
        return this.http.post('/api/deliveries', salary);
    }

    update(salary: Salary) {
        return this.http.put('/api/deliveries/' + salary.id, salary);
    }

    delete(id: number) {
        return this.http.delete('/api/deliveries/' + id);
    }*/
}
