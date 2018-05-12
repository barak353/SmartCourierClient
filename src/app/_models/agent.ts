import { Delivery } from './index';

export class Agent {
    id: number;
    email: string;
    phone: string;
    preferredArea: string;
    po: string;
    totalPaid: string;
    delivery: Delivery[];
}
