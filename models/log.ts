
import { Model } from ".";
import { DataBase } from "../dbs";

import moment from "moment";
import axios from "axios";

export const App = {
    API: 'api',
}

export interface ILog {
    _id?: string;
    app?: string;
    msg: string;
    created?: string;
}

export const Log = {

    // constructor(db: DataBase, definition: any) {
    //     super(db, "logs", definition);
    // }

    async save(data: ILog) {
        const url = `${process.env.LOG_SVC_URL}`;
        const payload = { ...data, created: moment().toISOString() };
        if (!payload.app) {
            payload.app = App.API;
        }
        return await axios.post(url, payload);
    }
}