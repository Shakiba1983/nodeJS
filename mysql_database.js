

// استفاده از async/await
async function testDB() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  }
}

testDB();


// به دلیل استفاده از postgress ساختار فرق میکنه

// دریافت همه 
const getCourses = async () => {
  try {
    const result = await pool.query("SELECT * FROM courses");
    return result.rows;
  } catch (err) {
    console.error(err);
  }
};
// دریافت یک ردیف
const getCourse = async (id) => {
  try {
    const result = await pool.query(`SELECT * FROM courses where id=$1`, [id]);
    return result.rows;
  } catch (err) {
    console.error(err);
  }
};
// وارد کردن
const insertCourse = async (title) => {
  const result = await pool.query(
    `INSERT INTO courses (title) VALUES ($1) RETURNING *`,
    [title]
  );
    // console.log("Inserted row:", result.rows[0]); // اولین ردیف درج شده
  return result.rows;
};
// آپدیت کردن
const updateCourse = async (id , title) => {
  const result = await pool.query(
    `update courses set title =$1 where  id = $2 RETURNING *`,
    [title , id]
  );
  return result.rows;
};
// پاک کردن
const deleteCourse = async (id ) => {
  const result = await pool.query(
    `delete FROM courses where id=$1 RETURNING *`,
    [id]
  );
  return result.rows;
};

const callStoredFunction = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM fn_select_courses($1)', [id]);
    return result.rows; // داده‌ها اینجا برمی‌گردند
  } catch (err) {
    console.error(err);
  }
};

const data = (async () => {
  const result = await callStoredFunction(0);
  console.log(result);
})();
//  کد داخل دیتابیس نوشته شده اسپ پروسیجر
// DROP FUNCTION IF EXISTS fn_select_courses(INT);

// CREATE OR REPLACE FUNCTION fn_select_courses(_id INT)
// RETURNS TABLE(
//     id INT,
//     title VARCHAR(100),  -- مطابق نوع جدول
//     created_at TIMESTAMP
// )
// LANGUAGE plpgsql
// AS $$
// BEGIN
//     RETURN QUERY
//     SELECT c.id, c.title, c.created_at
//     FROM courses AS c
//     WHERE c.id >= _id;
// END;
// $$;



// اجرای تابع
// const data = getCourses('java').then((result) => {
//   console.log(result);
// });
// const data = getCourse('1').then((result) => {
//   console.log(result);
// });
// const data = insertCourse("java").then((result) => {
//   console.log(result);
// });
// const data = updateCourse(5, "java").then((result) => {
//   console.log(result);
// });
// const data =deleteCourse(6).then((result) => {
//   if (result.length > 0) {
//     console.log(`Deleted course with id 8:`, result[0]);
//   } else {
//     console.log("No course found with id 8");
//   }
// });


