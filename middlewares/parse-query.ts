import { Request, Response } from "express";

export const parseQuery = (req: Request, res: Response, next:any) => {
  const query = req.query;
  if (!query) {
    next();
  }
  if (query) {
    try{
      req.query = {
          where: JSON.parse(<string>query.where),
          options: query.options? JSON.parse(<string>query.options): {},
      };
    } catch (e){
      console.log(e);
    }
    
  }
  next();
}