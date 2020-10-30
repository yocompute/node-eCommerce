import { Request, Response } from "express";

export const parseQuery = (req: Request, res: Response, next:any) => {
  const query = req.query;
  if (!query) {
    next();
  }
  if (query.qStr) {
    try{
      req.query = JSON.parse(<string>query.qStr);
    } catch (e){
      console.log(e);
    }
    
  }
  next();
}