const express = require('express')
const router = express.Router()
const homecontroller = require('../controller/home-controler')
router.get("/", homecontroller.gethome)

module.exports = router