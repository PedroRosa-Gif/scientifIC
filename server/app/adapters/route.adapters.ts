import { Handler, NextFunction, Request, Response } from "express";

export const resolver = (handlerFn: Handler) => {
  return async (req:Request, res:Response, next:NextFunction) => {
    try {
      return await Promise.resolve(handlerFn(req, res, next));
    } catch (e) {
      return next(e);
    }
  }
}