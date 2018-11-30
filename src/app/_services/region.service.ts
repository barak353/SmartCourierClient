import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Region } from '../_models/index';

@Injectable()
export class RegionService {
    constructor(private http: HttpClient) { }
    baseUrl = 'http://localhost:8080';

    getRegionsByCourier() {
        return this.http.get<Region[]>( this.baseUrl + '/app/user/getAll/');
    }


}
