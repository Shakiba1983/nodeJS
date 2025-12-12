// const { Pool } = require("pg");
// require("dotenv").config();

// const pool = new Pool({
//   host: process.env.db_host,
//   user: process.env.db_user,
//   password: process.env.db_password,
//   database: process.env.db_database,
//   port: process.env.db_port,
// });

// module.exports = pool;


const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  max: 10,             // حداکثر اتصال‌ها
  idleTimeoutMillis: 30000,
});

pool.connect()
  .then(() => console.log("📌 Connected to PostgreSQL"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

module.exports = pool;
