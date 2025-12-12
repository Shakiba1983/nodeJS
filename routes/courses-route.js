const express = require("express");
const router= express.Router()
const coursescontroler = require ('../controller/courses-controller')


router.get("/",coursescontroler.getcourses);

router.get("/:id", coursescontroler.getcourse);

router.get("/:id/:name",coursescontroler.getcourseid);

router.post("/",coursescontroler.insertcourse );

router.put("/:id", coursescontroler.updatecourse);

router.delete("/:id",coursescontroler.deletecourse  )

module.exports = router;
