import { Delivery, Salary} from './index';

export class Agent {
    id: number;
    email: string;
    phone: string;
    preferredArea: string;
    po: string;
    currentTotalPaid: string;//this field is not exist in data base, so don't send it to DB.
    delivery: Delivery[];
    salary: Salary[];
}
