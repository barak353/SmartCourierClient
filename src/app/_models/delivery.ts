export class Delivery {
    id: number;
    name: string;
    isUrgent: string;
    address: string;
    latitude: string;
    longitude: string;
    type: string;//The server will choose the type of the delivery (defualt is 0).
}
