const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Mehdi",
  database: "nodejs",
  port: 5433
});

async function insertSample() {
  try {
    const res = await pool.query(
      "INSERT INTO courses (title) VALUES ($1) RETURNING *",
      ["C++"]
    );
    console.log("داده اضافه شد:", res.rows);
  } catch (err) {
    console.error(err);
  }
}

insertSample();

