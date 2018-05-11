import { Delivery } from './index';

export class Agent {
    id: number;
    email: string;
    phone: string;
    po: string;
    delivery: Delivery[];
}
