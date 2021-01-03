
import { IModelParams, Model } from "../model";
import { Product } from "./product.entity";
import { Code, IModelResult } from "../model";

export class ProductModel extends Model {
  constructor(params: IModelParams) {
    super(Product, params);
  }

  async find(query: any): Promise<IModelResult> {
    let data: any = [];
    let code = Code.FAIL;
    try {
      // typeorm
      // const repo = this.connection.getRepository(this.entity);
      // const r = await repo.find(query);

      // mongoose
      if (query) {
        query = this.convertIds(query);
      }
      const rs = await this.entityClass.find(query).populate('brand').populate('category').populate('specs').populate('additions');
      code = Code.SUCCESS;
      data = rs;
      return { code, data, error: '' };
    } catch (error) {
      return { code, data, error };
    }
  }

  async findOne(query: any): Promise<IModelResult> {
    let data: any = [];
    let code = Code.FAIL;
    try {
      // typeorm
      // const repo = this.connection.getRepository(this.entity);
      // const r = await repo.findOne(query);

      // mongoose
      if (query) {
        query = this.convertIds(query);
      }
      const { _doc } = await this.entityClass.findOne(query).populate('brand').populate('category').populate('specs').populate('additions');
      code = Code.SUCCESS;
      data = _doc;
      return { code, data, error: '' };
    } catch (error) {
      return { code, data, error };
    }
  }
}
