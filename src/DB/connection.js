const mysql = require('mysql2');
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Error to connect MariaDB:', err.message);
        return;
    }
    console.log('Database Successfully Connected');
});

module.exports = connection;