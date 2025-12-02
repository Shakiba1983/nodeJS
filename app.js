const logger = require("./logger")
const authentication = require("./authentication")
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.static('public'))
app.use(logger)
app.use(authentication)
app.use(helmet());
app.use(morgan("tiny"));


app.use(express.urlencoded({ extended: true }));

const courses = [
  { id: 1, name: "html" },
  { id: 2, name: "css" },
  { id: 3, name: "javascript" },
];

app.get("/", (req, res) => {
  res.send("home page");
});

app.get("/api/courses", (req, res) => {
  res.send(["html", "css", "java"]);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("course with given id not found  ");
  res.send([course]);
});

app.get("/api/courses/:id/:name", (req, res) => {
  res.send([req.params.id, req.params.name]);
});

app.post("/api/courses", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send("name is required");
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("course with given id not found  ");
  if (!req.body.name || req.body.name.length < 3)
    return res.status(400).send("name is required and more than 3 characher");
course.name = req.body.name;
res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Course with given id not found");
  const index   = courses.indexOf(course);
  courses.splice(index ,1);
  res.send(course);
} )

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`listening port ${port}`);
});
