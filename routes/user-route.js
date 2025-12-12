const express = require ('express')
const router   = express.Router()
const usercontroller = require("../controller/user-controller")

// post/api/users/register
// post/api/users/login

router.post("/register",usercontroller.register)
router.post("/login",usercontroller.login)


 module.exports=router
