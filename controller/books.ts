import { Router } from 'express';
import { BookService } from '../service/booksService';
import { authMiddleware } from '../middlewares/auth';
import { roleCheck } from '../middlewares/authAdmin';

const route = Router();
const bookService = new BookService();

export const bookRouter = ()=>{
    route.post('/', authMiddleware, roleCheck,async(req,res)=>{
        try {
            const result = await bookService.addBook(req.body);
            return res.status(200).json({result});
        } catch (error) {
            console.error('Error with adding book: ', error);
            return res.status(500).json({message: 'Error on the server'});
        }
    });

    route.get('/', async(req,res)=>{
        try {
           const rows = await bookService.getBooks();
           return res.status(200).json({rows}); 
        } catch (error) {
            console.error('Error with fetching books: ', error);
            return res.status(500).json({message: 'Error on the server'}); 
        }
    });

    route.get('/:id', async(req,res)=>{
        try {
            const id = parseInt(req.params.id);
            const book = await bookService.getBookbyID(id);
            return res.status(200).json({book});
        } catch (error) {
            console.error('Error with fetching a book by id: ', error);
            return res.status(500).json({message: 'Error on the server'});  
        }
    });

    route.put('/:id', authMiddleware, roleCheck,async(req,res)=>{
        try {
            const id = parseInt(req.params.id);
            const result = await bookService.updateBookById(id, req.body);    
            return res.status(200).json({result});
        } catch (error) {
            console.error('Error with updating a book by id: ', error);
            return res.status(500).json({message: 'Error on the server'});   
        }
    });

    route.delete('/:id', authMiddleware, roleCheck,async(req,res)=>{
        try {
            const id = parseInt(req.params.id); 
            const result = await bookService.deleteBookById(id);
            return res.status(200).json({result});
        } catch (error) {
            console.error('Error with deleting a book by id: ', error);
            return res.status(500).json({message: 'Error on the server'});   
        }
    })
    return route;
}