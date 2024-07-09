import jwt from 'jsonwebtoken';
import {secret} from '../config'

export const generateAccessToken = (id:any)=>{
    const payload = {
        id,
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'} );
}