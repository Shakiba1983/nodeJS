const logger = require("./middlewares/logger")
const authentication = require("./authentication")
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const  coursesRuter = require ('./routes/courses-route')
const  homeRoute = require('./routes/home-route')
const userRoute = require("./routes/user-route")

require("dotenv").config();
const app = express();
app.use(helmet());    // امنیت
app.use(express.json());     // JSON body
app.use(express.urlencoded({ extended: true }));    // form body

if (app.get("env") === "development") {
  app.use(morgan("tiny"));          // لاگ ویژه dev
}
app.use(logger)             // لاگر شخصی
app.use(authentication)           // auth

const startupDebug = require ("debug")("startup")
const dbDebug = require ("debug")("db")
// app.use(express.static('public'))

// مهم برای لاگ کردن در حالت دولوپر
 startupDebug("hello from startup debug")   // برای اینکه در ویندوز لاگ ها را نمایش بده باید از دستور $env:DEBUG="startup,db"; nodemon app 

app.use('/api/courses' , coursesRuter)
app.use('/api/users' , userRoute)
app.use("/", homeRoute );

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`listening port ${port}`);
});
