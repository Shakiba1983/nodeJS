// import مدل دوره‌ها از لایه Model
const { Result } = require("pg");
const CoursesModel = require("../models/courses-model");

// دریافت یک کورس با id
const getcourse = (req, res) => {
  // req.params.id همیشه string هست → تبدیل به عدد
  CoursesModel.getCourse(parseInt(req.params.id)).then((result) => {
    // اگر نتیجه‌ای نبود → 404
    if (!result)
      return res.status(404).send("course with given id not found");

    // ارسال نتیجه به صورت آرایه
    res.send([result]);
  });
};

// دریافت همه کورس‌ها
const getcourses = (req, res) => {
  CoursesModel.getCourses().then((result) => {
    // ارسال کل لیست دوره‌ها
    res.send(result);
  });
};

// نمونه مسیر با دو پارامتر
const getcourseid = (req, res) => {
  // ارسال params برای تست
  res.send([req.params.id, req.params.name]);
};

// افزودن یک کورس جدید
const insertcourse = (req, res) => {
  // اعتبارسنجی ساده نام کورس
  if (!req.body.name || req.body.name.length < 3) {
    return res.status(400).send("name is required and must be >= 3 chars");
  }

  // ذخیره در دیتابیس
  CoursesModel.insertcourse(req.body.name).then((result) => {
    res.send(result);
  });
};

// آپدیت کورس
const updatecourse = async (req, res) => {
  // ابتدا بررسی می‌کنیم که id معتبر باشد و کورس وجود داشته باشد
  const course = await CoursesModel.getCourse(parseInt(req.params.id));

  if (!course) {
    // اگر نبود → 404
    return res.status(404).send("course with given id not found");
  }

  // اعتبارسنجی نام جدید
  if (!req.body.name || req.body.name.length < 3) {
    return res.status(400).send("name is required and must be >= 3 chars");
  }

  // انجام آپدیت
  const result = await CoursesModel.updatecourse(
    parseInt(req.params.id),
    req.body.name
  );

  // ارسال نتیجه
  res.send(result);
};

// حذف کورس
const deletecourse = async (req, res) => {
  // چک می‌کنیم کورس وجود دارد یا نه
  const course = await CoursesModel.getCourse(parseInt(req.params.id));

  if (!course) {
    // اگر نبود → 404
    return res.status(404).send("course with given id not found");
  }

  // انجام حذف
  const result = await CoursesModel.deletecourse(parseInt(req.params.id));

  // ارسال نتیجه
  res.send(result);
};

// خروجی گرفتن از متدها برای استفاده در Router
module.exports = {
  getcourse,
  getcourses,
  insertcourse,
  updatecourse,
  deletecourse,
  getcourseid,
};
