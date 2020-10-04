import express from 'express';

import { DataBase } from "../dbs";
// import {LogController} from '../controllers/log';


export function LogRoute(db: DataBase) {
    const router = express.Router();
    // const controller = new LogController({db, sse: undefined});
    // router.post('/', (req, res) => { controller.insertOne(req, res); });
    // router.get('/', (req, res) => { controller.find(req, res); });
    // router.put('/:id', (req, res) => { controller.updateOne(req, res); });
    return router;
} 