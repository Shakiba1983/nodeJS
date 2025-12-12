const pool = require('../utilities/mysql_database')

class CoursesModel {
static getCourses = async () => {
  try {
    const result = await pool.query("SELECT * FROM courses");
    return result.rows;
  } catch (err) {
    console.error(err);
  }
};
// دریافت یک ردیف
static getCourse = async (id) => {
  try {
    const result = await pool.query(`SELECT * FROM courses where id=$1`, [id]);
    return result.rows;
  } catch (err) {
    console.error(err);
  }
};
// وارد کردن
static insertCourse = async (title) => {
  const result = await pool.query(
    `INSERT INTO courses (title) VALUES ($1) RETURNING *`,
    [title]
  );
    // console.log("Inserted row:", result.rows[0]); // اولین ردیف درج شده
  return result.rows;
};
// آپدیت کردن
static updateCourse = async (id , title) => {
  const result = await pool.query(
    `update courses set title =$1 where  id = $2 RETURNING *`,
    [title , id]
  );
  return result.rows;
};
// پاک کردن
static deleteCourse = async (id ) => {
  const result = await pool.query(
    `delete FROM courses where id=$1 RETURNING *`,
    [id]
  );
  return result.rows;
};
 }

 module.exports = CoursesModel