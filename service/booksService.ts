import {db} from '../db/config';

export class BookService{
    async addBook(body:any){
        const { title, author, publicationDate, genres} = body;
        await db.execute('Insert into books (title, author, publicationDate, genres) VALUES (?, ?, ?, ?)', [title, author, publicationDate, genres]);
        const [result] = await db.execute('Select * from books where title = ?', [title]) as any;
        return result[0];
    }

    async getBooks(){
        const [books] = await db.query('Select * from books') as any;
        return books[0];
    }

    async getBookbyID(id:any){
        const [rows] = await db.execute('Select * from books WHERE id = ?', [id]) as any;
        return rows[0];
    }

    async updateBookById(id:any, body:any){
        const { title, author, publicationDate, genres} = body;
        await db.execute('UPDATE books SET title = ?, author =?, publicationDate =?, genres=? WHERE id =?', [title, author, publicationDate, genres, id]);
        const [result] = await db.execute('select * from books where id = ?', [id]) as any;
        return result[0];
    }

    async deleteBookById(id:any){
        await db.execute('DELETE from books WHERE id = ?', [id]) as any;
        return 'Deleted';
    }
}