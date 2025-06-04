import { Request, Response, NextFunction } from "express";

const allowedOrigins = [
    "http://localhost:3000"
];

const alowedMethodos = [
    'GET',
    'POST',
    'PATCH'
];

export function corsMiddleware (req: Request, res: Response, next: NextFunction): void{
    const origin = req.headers.origin;
    if(origin && allowedOrigins.includes(origin)){
        if(!alowedMethodos.includes(req.method)){
            res.status(200).json({ message: `Not allowed to use ${req.method} method`});
        }
        next();
    }else{
        res.status(403).json({ message: `addres: ${origin} not allowed by cors`});
    }
}