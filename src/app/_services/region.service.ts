import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Region, Delivery } from '../_models/index';

@Injectable()
export class RegionService {
    constructor(private http: HttpClient) { }
    baseUrl = 'http://localhost:8080';

    createDeliveryInRegion(delivery: Delivery, regionId: Number){
      return this.http.put<Region>( this.baseUrl + '/region/update/' + regionId, delivery);
    }

    getAll(){
      return this.http.get<Region[]>( this.baseUrl + '/region/getAll');
    }

    getRegion(region: Region){
      return this.http.get<Region>( this.baseUrl + '/region/get' + '/' + region.id);
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

    deleteDeliveryInRegion(regionId: number, deliveryId: number) {
      return this.http.delete(this.baseUrl + '/region/delete/' + regionId + '/' + deliveryId);
    }

}
