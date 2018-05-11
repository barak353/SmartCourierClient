import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Agent } from '../_models/index';

@Injectable()
export class AgentService {
    constructor(private http: HttpClient) { }

    // getAll() {
    //     return this.http.get<Agent[]>('/api/agents');
    // }

    getAll() {
        return this.http.get<Agent[]>('http://localhost:8080/agent/getAll');
    }

    getById(id: number) {
        return this.http.get('/api/agents/' + id);
    }

    create(agent: Agent) {
        return this.http.post('/api/agents', agent);
    }

    update(agent: Agent) {
        return this.http.put('/api/agents/' + agent.id, agent);
    }

    delete(id: number) {
        return this.http.delete('/api/agents/' + id);
    }
}
