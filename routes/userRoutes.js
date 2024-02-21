const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/user/userControllers")
const verifyUser = require("../middleware/middleware")

router.post("/usersignup",userControllers.userSignup)
router.post("/usersignin",userControllers.userSignin)
router.get("/getuserdetails",verifyUser(),userControllers.getUserDetails)


module.exports = router