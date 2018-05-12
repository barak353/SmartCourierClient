import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Agent } from '../_models/index';

@Injectable()
export class AgentService {
    constructor(private http: HttpClient) { }

    baseUrl = 'http://localhost:8080';

    // getAll() {
    //     return this.http.get<Agent[]>('/api/agents');
    // }

    getAll() {
        return this.http.get<Agent[]>(this.baseUrl + '/agent/getAll');
    }

    getById(id: number) {
        return this.http.get(this.baseUrl + '/agent/' + id);
    }

    /*create(agent: Agent) {
        return this.http.post(this.baseUrl + '/agent/getAll', agent);
    }Not exist yet..*/

    update(agent: Agent) {
        return this.http.put(this.baseUrl + '/agent/update/' + agent.id, agent);
    }

    delete(id: number) {
      return this.http.delete(this.baseUrl + '/agent/delete/' + id);
    }
}
