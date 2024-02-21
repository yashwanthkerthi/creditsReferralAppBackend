const express = require("express")
const router = express.Router()
const adminControllers = require("../controllers/admin/adminControllers")
const verifyUser = require("../middleware/middleware") 

router.post("/adminsignup",adminControllers.adminSignup)
router.post("/adminsignin",adminControllers.adminSignin)
router.post("/adduserdetails",verifyUser(),adminControllers.addUserDetails)
router.get("/getadmindetails",verifyUser(),adminControllers.getAdminDetails)

module.exports = router