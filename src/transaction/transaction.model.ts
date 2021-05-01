import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { ITransaction, Transaction } from "./transaction.entity";
import { IModelResult } from "../model";


export class TransactionModel extends Model<ITransaction> {
  constructor(params: IModelParams) {
    super(Transaction, params);
  }


  async find(query: core.Query): Promise<IModelResult<ITransaction[]>> {
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const data: ITransaction[] = await this.model.find(query).populate('from').populate('to').populate('by').populate('payment').lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async findOne(query: core.Query): Promise<IModelResult<ITransaction>> {
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const data: ITransaction = await this.model.findOne(query).populate('from').populate('to').populate('by').populate('payment').lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}