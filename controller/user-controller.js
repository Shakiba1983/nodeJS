// ایمپورت نیازمندی‌ها
const { request } = require("express"); // اگر نیازی به request نیست، می‌توان حذف کرد
const UserModal = require("../models/users-model"); // مدل کاربر برای تعامل با دیتابیس
const Joi = require("joi"); // کتابخانه اعتبارسنجی داده‌ها
const _ = require("lodash"); // برای انتخاب فیلدهای مشخص از آبجکت برای عدم نمایش پسورد
const bcrypt = require("bcrypt"); // برای هش کردن و بررسی پسورد

// متد ثبت‌نام کاربر
const register = async (req, res, next) => {
  // تعریف schema برای اعتبارسنجی داده‌ها با Joi
  const schema = {
    name: Joi.string().min(3).max(50).required().messages({
      "string.min": "تعداد کارکتر نام باید حداقل 3 باشد",
      "string.max": "تعداد کارکتر نام نمی‌تواند بیشتر از 50 باشد",
    }),
    email: Joi.string().email().required(), // ایمیل باید معتبر باشد
    password: Joi.string().min(5).max(50).required(), // رمز عبور بین 5 تا 50 کاراکتر
  };

  // اعتبارسنجی اطلاعات دریافتی از req.body
  const validateresult = Joi.object(schema).validate(req.body);

  // اگر اعتبارسنجی شکست خورد، پیام خطا را ارسال کن
  if (validateresult.error)
    return res.send(validateresult.error.details[0].message);

  // بررسی اینکه آیا کاربر با این ایمیل قبلاً ثبت‌نام کرده است
  const user = await UserModal.getUserByEmail(req.body.email);
  if (user) return res.status(400).send("کاربر قبلاً ثبت شده است");

  // هش کردن رمز عبور قبل از ذخیره در دیتابیس
  const hashPassword = await bcrypt.hash(req.body.password, 10);

  // ثبت کاربر جدید در دیتابیس
  const result = await UserModal.insertUser(
    req.body.name,
    req.body.email,
    hashPassword
  );
  console.log(result); // نمایش نتیجه ثبت در کنسول

  // گرفتن اطلاعات کامل کاربر جدید برای پاسخ دادن به کلاینت
  const newUser = await UserModal.getUserByEmail(req.body.email);

  // ارسال اطلاعات کاربر جدید به کلاینت با انتخاب فیلدهای id, name, email
  res.send(_.pick(newUser, ["id", "name", "email"]));
};

// متد ورود کاربر
const login = async (req, res, next) => {
  // تعریف schema برای اعتبارسنجی داده‌ها با Joi
  const schema = {
    email: Joi.string().email().required(), // ایمیل باید معتبر باشد
    password: Joi.string().min(5).max(50).required(), // رمز عبور بین 5 تا 50 کاراکتر
  };

  // اعتبارسنجی اطلاعات دریافتی از req.body
  const validateresult = Joi.object(schema).validate(req.body);
  if (validateresult.error)
    return res.send(validateresult.error.details[0].message);

  // پیدا کردن کاربر با ایمیل
  const user = await UserModal.getUserByEmail(req.body.email);
  if (!user) return res.status(400).send("ایمیل یا رمز عبور اشتباه است");

  // بررسی رمز عبور با bcrypt
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("ایمیل یا رمز عبور اشتباه است");

  // در این مرحله، کاربر با موفقیت وارد شد
  // می‌توان بعداً JWT یا session صادر کرد
  res.send("ورود موفقیت‌آمیز بود");
};

module.exports = { register, login };
