import jwt from 'jsonwebtoken';
import { secret } from '../config';

export function authMiddleware(req:any,res:any,next:any){
    try {
        const token = req.headers.authorization?.split(' ')[1]; 
    
        if(!token){
            return res.status(401).json({message: 'This user is not authorized'});
        }
    
        const decoded = jwt.verify(token, secret) as {id:any};
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error('Error with authentication token: ', error);
        return res.status(401).json({message: 'This user is not authorized'});
    }
}