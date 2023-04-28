import {Request, Response, NextFunction} from "express";

const acessControlOrigin = (req:Request, res:Response, next:NextFunction) => {
res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

if (req.method === 'OPTIONS') {
res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
return res.status(200).send({});
}

next();
}

export default acessControlOrigin;