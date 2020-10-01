import express from 'express';

import { DataBase } from "../dbs";
import {LogController} from '../controllers/log';
import SSE from 'express-sse-ts';


export function EventRoute(sse: SSE) {
    const router = express.Router();

    router.get('/', sse.init);

    // router.post('/', (req, res) => { controller.insertOne(req, res); });
    // router.put('/:id', (req, res) => { controller.updateOne(req, res); });
    return router;
} 