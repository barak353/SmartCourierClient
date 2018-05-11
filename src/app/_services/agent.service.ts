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
        return this.http.get<Agent[]>(baseUrl + '/agent/getAll');
    }

    getById(id: number) {
        return this.http.get(baseUrl + '/agent/' + agent.id);
    }

    create(agent: Agent) {
        return this.http.post(baseUrl + '/agent/getAll', agent);
    }

    update(agent: Agent) {
        return this.http.put(baseUrl + '/agent/update/' + agent.id, agent);
    }

    delete(id: number) {
        //return this.http.delete(baseUrl + '/agent/getAll' + id);

    }
}
