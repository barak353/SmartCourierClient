import { Delivery} from './index';

export class Region {
    id: number;
    regionName: string;
    threshold: number;
    delivery: Delivery[];
}
