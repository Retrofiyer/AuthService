const mysql = require('mysql2/promise');
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_NAME
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Database Successfully Connected");
        connection.release();
    } catch (err) {
        console.error("❌ Error connecting to MariaDB:", err.message);
    }
})();

module.exports = pool;