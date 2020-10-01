import { Model } from ".";
import { DataBase } from "../dbs";


export class Product extends Model {

    constructor(db: DataBase, definition: any) {
        super(db, "products", definition);
    }
}