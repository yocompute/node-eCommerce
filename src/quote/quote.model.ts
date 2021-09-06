import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { Quote, IQuote } from "./quote.entity";
import { IModelResult } from "../model";



export class QuoteModel extends Model<IQuote> {
  constructor(params: IModelParams) {
    super(Quote, params);
  }


  async find(query: core.Query): Promise<IModelResult<IQuote[]>> {
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const data: IQuote[] = await this.model.find(query).lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
  }

  async findOne(query: core.Query): Promise<IModelResult<IQuote>> {
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const data: IQuote = await this.model.findOne(query).lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
  }
}