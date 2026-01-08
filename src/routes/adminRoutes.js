const express = require('express')
const router = express.Router()

// adminController
const { adminsignup, adminsignin, adminaccount, admincreate, admindelete, adminclear, adminlogout } = require('../controllers/adminController')

// Middlewares
const adminAuth = require('../middlewares/adminAuth')
const upload = require('../middlewares/multerLogic')

router.post('/signup', adminsignup)

router.post('/signin', adminsignin)

router.get("/account", adminAuth, adminaccount)

router.post("/create", adminAuth, upload.single('image'), admincreate)

router.delete("/delete", adminAuth, admindelete)

router.delete("/clear", adminAuth, adminclear)

router.delete("/logout", adminAuth, adminlogout)

module.exports = router