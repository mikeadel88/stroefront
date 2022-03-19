import express ,{Request,Response} from "express";
import jwt from "jsonwebtoken"
const verifyToken = async (req: Request, res: Response,next:Function) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = (authorizationHeader as string).split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
        next()
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    }
export default verifyToken;