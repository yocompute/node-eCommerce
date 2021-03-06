import { Request, Response, NextFunction } from "express";

export const parseQuery = (req: Request, res: Response, next: NextFunction): void => {
  const query = req.query;
  if (!query) {
    next();
  }
  if (query.where) {
    try {
      req.query = JSON.parse(<string>query.where);
    } catch (e) {
      console.log(e);
    }

  }
  next();
}