import * as mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'dev',
    password: 'dev',
    database: 'booksAPI',
});

export const Roles = {
    USER: 1 << 0,    // 1
    ADMIN: 1 << 1,   // 2
    EDITOR: 1 << 2,  // 4
};