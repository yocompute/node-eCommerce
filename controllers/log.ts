import { Model } from "../models/index";
import { DataBase } from "../dbs/index";
import { Controller, IControllerParams } from "./index";
import { Log } from "../models/log";


export class LogController extends Controller {

  
    constructor(params: IControllerParams) {
      super(
        new Log(params.db, {msg: 'String', created: 'String'}),
        params
      );
    }
  }