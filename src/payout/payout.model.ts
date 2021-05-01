// import * as core from 'express-serve-static-core';
// import { IModelParams, Model } from "../model";
// import { IPayout, Payout } from "./payout.entity";
// import { IModelResult } from "../model";


// export class PayoutModel extends Model<IPayout> {
//   constructor(params: IModelParams) {
//     super(Payout, params);
//   }


//   async find(query: core.Query): Promise<IModelResult<IPayout[]>> {
//     try {
//       if (query) {
//         query = this.convertIds(query);
//       }
//       const data: ITransaction[] = await this.model.find(query).populate('from').populate('to').populate('by').populate('payment').lean();
//       return { data, error: '' };
//     } catch (error) {
//       throw new Error(`${error}`);
//     }
//   }

//   async findOne(query: core.Query): Promise<IModelResult<IPayout>> {
//     try {
//       if (query) {
//         query = this.convertIds(query);
//       }
//       const data: IPayout = await this.model.findOne(query).populate('from').populate('to').populate('by').populate('payment').lean();
//       return { data, error: '' };
//     } catch (error) {
//       throw new Error(`${error}`);
//     }
//   }
// }