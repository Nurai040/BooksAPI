import {db} from '../db/config';
import bcrypt from 'bcrypt';
import { generateAccessToken } from './jwt';

export class UserService{
    async register(body:any){
        const {username, email, password} = body;
        const hashPassword = await bcrypt.hash(password, 10);
        await db.execute('INSERT INTO users (username, email, password) VALUES (?,?,?)', [username,email,hashPassword]);
        const [result] = await db.execute('select * from users where email = ?', [email]) as any;
        return result[0];
    }

    async login(body:any){
        const {username, password} = body;
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]) as any;
        db.query('SELECT * FROM users WHERE username = ?', [username], )
        const user = rows[0];
        if(!user){
            return 'Invalid username';
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return 'Invalid password';
        }
        const token = generateAccessToken(user.id);
        const res = {
            token: token,
        }
        return res;
    }

    async currentUser(id:any){
        const [result] = await db.execute('select * from users where id = ?', [id]) as any;
        return result[0];
    }

    async updateUserRole(role:any, id:any){
        await db.execute('UPDATE users SET role = ? WHERE id = ?', [role, id]) as any;
        const [updated] = await db.execute('select * from users WHERE id = ?', [id]) as any;
        return updated[0];
    }
}