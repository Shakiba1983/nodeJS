const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Mehdi",
  database: "nodejs",
  port: 5433
});

async function createTable() {
  try {
    // فعال کردن extension برای UUID
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    // ایجاد جدول با id از نوع UUID
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(250) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    await pool.query(query);
    console.log("جدول users با UUID برای id با موفقیت ساخته شد.");
  } catch (err) {
    console.error("خطا در ساخت جدول:", err);
  }
}

createTable();
