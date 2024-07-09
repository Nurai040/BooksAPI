import { Router } from 'express';
import { UserService } from '../service/userService';
import { authMiddleware } from '../middlewares/auth';
import { roleCheck } from '../middlewares/authAdmin';

const route = Router();
const userService = new UserService();

export const userRouter = ()=>{
    route.post('/register', async(req,res)=>{
       try {
            const result = await userService.register(req.body);
            return res.json({result});
       } catch (error) {
            console.error('Error with register: ', error);
            return res.status(500).json({message: 'Error on the server'});
       }
    });

    route.post('/login', async(req,res)=>{
        try {
            const result = await userService.login(req.body);
            return res.json({result});
        } catch (error) {
            console.error('Error with login: ', error);
            return res.status(500).json({message: 'Error on the server'}); 
        }
    });

    route.get('/me', authMiddleware,async(req:any,res)=>{
        try {
            const id = req.userId;
            const result = await userService.currentUser(id);
            return res.json({result});
        } catch (error) {
            console.error('Error with fetching current user: ', error);
            return res.status(500).json({message: 'Error on the server'}); 
        }
    });

    route.put('/:id/role', authMiddleware, roleCheck,async(req,res)=>{
        try {
            const id = parseInt(req.params.id);
            const {role} = req.body;
            const rolee = parseInt(role);
            const result = await userService.updateUserRole(rolee, id);
            return res.json({result});
        } catch (error) {
            console.error('Error with changine the role of the user: ', error);
            return res.status(500).json({message: 'Error on the server'});  
        }
    })

    return route;
}