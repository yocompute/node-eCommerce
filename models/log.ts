
import { Model } from ".";
import { DataBase } from "../dbs";


export class Log extends Model {

    constructor(db: DataBase, definition: any) {
        super(db, "logs", definition);
    }
}