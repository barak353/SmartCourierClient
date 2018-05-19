import { Delivery, Salary} from './index';

export class Agent {
    id: number;
    email: string;
    phone: string;
    preferredArea: string;
    po: string;
    delivery: Delivery[];
    salary: Salary[];
}
