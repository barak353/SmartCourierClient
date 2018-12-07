﻿import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Region, Delivery } from '../_models/index';

@Injectable()
export class RegionService {
    constructor(private http: HttpClient) { }
    baseUrl = 'http://localhost:8080';

    getAll(){
      return this.http.get<Region[]>( this.baseUrl + '/region/getAll');
    }

    addCourierToRegion(regionId : Number, courierId : Number) {
        return this.http.get<Region>(this.baseUrl + '/region/update/' + regionId  + '/' + courierId);
    }

    getRegionsByCourierId(courierId : Number) {
        return this.http.get<Region[]>( this.baseUrl + '/region/getRegions/' + courierId);
    }

    getCourierDeliveries(courierId : Number, regionId : Number) {
        return this.http.get<Delivery[]>( this.baseUrl + '/region/getDeliveries/' + regionId + '/' + courierId);
    }

    delete(id: number) {
      return this.http.delete(this.baseUrl + '/region/delete/' + id);
    }
}
