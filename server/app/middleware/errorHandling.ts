import { NextFunction, Request, Response } from "express";

const errorHandling = (error:Error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).send({
      message: error.message
    });
  }

  next();
}

export { errorHandling }