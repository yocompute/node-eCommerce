import { Model } from ".";
import { DataBase } from "../dbs";

export interface ITransaction{
    _id?: string;
    clientId: string;
    merchantId: string;
    amount: number;
    status: number;

    createUTC: string;
    modifyUTC: string;
}

export class Transaction extends Model {

    constructor(db: DataBase, definition: any) {
        super(db, "transactions", definition);
    }
}