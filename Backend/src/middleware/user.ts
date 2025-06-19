import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_TOKEN_KEY } from '../configs/commonConfig';
export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers['authorization'];
    const decode = jwt.verify(header as string, JWT_TOKEN_KEY);
    if (decode) {
        // @ts-ignore
        req.userId = decode.user._id;
        next();
    } else {
        res.status(401).json({
            message: "You are not authenticated in the application"
        })
    }
}