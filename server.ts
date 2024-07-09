import express from 'express';
import { db } from './db/config';
import { userRouter } from './controller/users';
import { bookRouter } from './controller/books';

const app = express();
const port = 3000;
app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter());
app.use('/books', bookRouter());

const start =async ()=>{
    try {
        await db.getConnection();
        app.listen(port, () => {
            console.log(`Server is running on the ${port} port`)
        });
    } catch (error) {
        console.log('Error starting the app: ',error);
    }
}

start();