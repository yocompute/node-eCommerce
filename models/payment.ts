import { Model } from ".";
import { DataBase } from "../dbs";
import { IOrderItem } from "./order";

export interface IPaymentStatus{
    PAID: 'Paid',
    UNPAY: 'Unpay'
}

export interface IPayment{
    _id?: string;
    price: number;
    cost: number;
    tax: number;
    paymentMethod: string;
    status: IPaymentStatus;

    originalPrice?: number;
    orderIds?: string[];
}

export class Payment extends Model {

    constructor(db: DataBase, definition: any) {
        super(db, "payments", definition);
    }

    getOrders(items: IOrderItem[], pickupDateTime: string){
        const orderMap: any = {};
        items.forEach(it => {
            const key = `${it.merchantId}`;

            // pickupDateTime: string;
            // createDateTime: string;
            // modifyDateTime: string;
            orderMap[key] = { items: [], price: 0, cost:0, tax: 0, pickupDateTime }
        });

        items.forEach((it: IOrderItem) => {
            const key = `${it.merchantId}`;
            orderMap[key].items.push(it);
            orderMap[key].price += it.price;
            orderMap[key].cost += it.cost;
            orderMap[key].tax += Math.round(it.price * it.taxRate) / 100;
        });


    }
}