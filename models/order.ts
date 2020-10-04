import { Model } from ".";
import { DataBase } from "../dbs";

export interface IOrderItem{
    _id?: string;
    productId: string;
    productName: string;
    merchantId: string;
    merchantName: string;
    price: number;
    cost: number;
    taxRate: number;
    quantity: number;

    // pickupDateTime: string;
}

export interface IOrder{
    _id?: string;
    items: IOrderItem[];
    price: number;
    cost: number;
    tax: number;

    pickupUTC: string;
    createUTC: string;
    modifyUTC: string;
}

export class Order extends Model {

    constructor(db: DataBase, definition: any) {
        super(db, "orders", definition);
    }
}