
import { IModelParams, Model } from "../model";
import { Brand } from "./brand.entity";
import { Code, IModelResult} from "../model";

export class BrandModel extends Model {
    constructor(params: IModelParams) {
        super(Brand, params);
    }


  async find(query: any): Promise<any> {
    let data: any = [];
    
    try {
      // typeorm
      // const repo = this.connection.getRepository(this.entity);
      // const r = await repo.find(query);

      // mongoose
      if(query){
        query = this.convertIds(query);
      }
      const rs = await this.entityClass.find(query).populate('owner');
      
      data = rs;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
  }

  async findOne(query: any): Promise<any> {
    let data: any = [];
    
    try {
      // typeorm
      // const repo = this.connection.getRepository(this.entity);
      // const r = await repo.findOne(query);

      // mongoose
      if(query){
        query = this.convertIds(query);
      }
      const {_doc} = await this.entityClass.findOne(query).populate('owner');
      
      data = _doc;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
  }
}