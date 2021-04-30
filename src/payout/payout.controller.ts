// import { Controller } from "../controller";
// import {Document} from 'mongoose';
// import { Request, Response } from "express";
// import * as core from 'express-serve-static-core';
// import SSE from "express-sse-ts";
// // import { Connection, Repository, EntityTarget, FindManyOptions } from "typeorm";
// import { IModelResult, Model } from './model';

// export class PayoutController<T extends Document> {
//     public model: Model<T>;

//     constructor(model: Model<T>) {
//         this.model = model;
//     }

//      async find(req: Request, res: Response): Promise<void> {
//         const query: core.Query = req.query;
//         res.setHeader('Content-Type', 'application/json');

//         try {
//             const r: IModelResult<T[]> = await this.model.find(query);
//             if(r.data){
//                 res.status(200).send(r);
//             }else{
//                 res.status(403).send(r);
//             }
//         }catch(error){
//             res.status(500).send({error: error.message});
//         }
//     }

//     async insertOne(req: Request, res: Response): Promise<void> {
//         const d = req.body;
//         res.setHeader("Content-Type", "application/json");
//         if (req.body) {
//             try {
//                 const r = await this.model.insertOne(d);
//                 if(r.data){
//                     res.status(200).send(r);
//                 }else{
//                     res.status(403).send(r);
//                 }
//             }catch(error){
//                 res.status(500).send({error: error.message});
//             }
//         } else {
//             res.status(400).send({error: 'No data in request'});
//         }
//     }

//     async updateOne(req: Request, res: Response): Promise<void> {

//         const id = req.params.id;
//         const updates = { $set: Object.assign(Object.assign({}, req.body), { updateUTC: new Date() }) };

//         res.setHeader("Content-Type", "application/json");
//         if (updates) {
//             try {
//                 const r: IModelResult<T>  = await this.model.updateOne({ _id: id }, updates);
//                 if(r.data){
//                     res.status(200).send(r);
//                 }else{
//                     res.status(403).send(r);
//                 }
//             }catch(error){
//                 res.status(500).send({error: error.message});
//             }
//         } else {
//             res.status(400).send({error: 'No data in request'});
//         }
//     }
// }