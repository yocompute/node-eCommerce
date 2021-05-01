import { Controller } from "../controller";
import { ITransaction } from "./transaction.entity";
import { TransactionModel } from "./transaction.model";

export class TransactionController extends Controller<ITransaction> {
    transactionModel: TransactionModel;
    constructor(model: TransactionModel) {
        super(model);
        this.transactionModel = model;
    }
}