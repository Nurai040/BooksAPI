import jwt from 'jsonwebtoken';
import { secret } from '../config';
import { db } from '../db/config';
import { Roles } from '../db/config';

export async function roleCheck(req:any,res:any,next:any){
    try {
        const token = req.headers.authorization?.split(' ')[1]; 

        if (!token) {
            return res.status(401).json({ message: 'Authentication token missing' });
        }

        const decoded: any = jwt.verify(token, secret);

        const [results] = await db.execute('SELECT * FROM users WHERE id = ?', [decoded.id]) as any;
        const user = results[0];

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        
        if (user.role !== Roles.ADMIN) {
            return res.status(403).json({ message: 'Unauthorized: User is not an admin' });
        }

        next();
    } catch (error) {
        console.error('Error with authentication role: ', error);
        return res.status(401).json({message: 'This user is not an Admin'});
    }
}