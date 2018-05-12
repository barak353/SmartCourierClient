import { Injectable } from '@angular/core';
import { HttpClient, RequestOptions, Request} from '@angular/common/http';

import { User, Agent } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
    baseUrl = 'http://localhost:8080';

    // getAll() {
    //     return this.http.get<User[]>('/api/users');
    // }

    getAll() {
        return this.http.get<User[]>( this.baseUrl + '/app/user/getAll/');
    }

    getById(id: number) {
        return this.http.get( this.baseUrl + '/app/user/' + id);
    }

    create(user: User) {

        return this.http.post( this.baseUrl + '/app/user/create/', {
          "username":user.username, "password":user.password, "firstName":user.firstName, "lastName": user.lastName, "agent":user.agent,
          "email":user.agent.email, "phone":user.agent.phone, "preferredArea":user.agent.preferredArea, "po":user.agent.po, "totalPaid":user.agent.totalPaid
        });
        // return this.ExecutePost('/app/user/create/', user);
    }

    update(user: User) {
        return this.http.put( this.baseUrl + '/app/user/update/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete( this.baseUrl + '/app/user/delete/' + id);
    }

    // protected ExecutePost(path: string, data: any) {
    //     let body = JSON.stringify(data);
    //     let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    //
    //     let requestoptions: RequestOptions = new RequestOptions({
    //         method: 'POST',
    //         url: this.baseUrl + path,
    //         headers: headers,
    //         body: body
    //     });
    //
    //     return this.http.request(new Request(requestoptions))
    //         .map((res: Response) => { return res.json(); });
    // }
}
