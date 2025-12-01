const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());

app.use(function(req , res , next ){
  console.log("logging...")
  next()
})
app.use((req , res , next )=>{
  console.log("authentication...")
  next()
})
const courses = [
  { id: 1, name: "html" },
  { id: 2, name: "css" },
  { id: 3, name: "javascript" },
];

app.get("/", (req, res) => {
  res.send("home page");
});

app.get("/app/courses", (req, res) => {
  res.send(["html", "css", "java"]);
});

app.get("/app/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("course with given id not found  ");
  res.send([course]);
});

app.get("/app/courses/:id/:name", (req, res) => {
  res.send([req.params.id, req.params.name]);
});

app.post("/app/courses", (req, res) => {
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

app.put("/app/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("course with given id not found  ");
  if (!req.body.name || req.body.name.length < 3)
    return res.status(400).send("name is required and more than 3 characher");
course.name = req.body.name;
res.send(course);
});

app.delete("/app/courses/:id", (req, res) => {
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
