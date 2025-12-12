const pool = require("../utilities/mysql_database");

class UserModel {
    static insertUser = async (name, email, password) => {
        const query = `
            INSERT INTO users (id, name, email, password)
            VALUES (gen_random_uuid(), $1, $2, $3)
            RETURNING *;
        `;
        // $1, $2, $3 جایگزین پارامترها می‌شوند تا از SQL Injection جلوگیری شود
        const values = [name, email, password];

        const { rows } = await pool.query(query, values);
        return rows[0];
    }
    static getUserByEmail = async (email) => {
        const query = `
            SELECT * FROM users WHERE email = $1 LIMIT 1;
        `;
        const values = [email];
        const { rows } = await pool.query(query, values);
        return rows[0]; // خروجی کاربر پیدا شده
    }
}

module.exports = UserModel;
