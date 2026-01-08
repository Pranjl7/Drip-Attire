const express = require('express')
const router = express.Router()

// userController
const { usersignup, usersignin, useraccount, usercart, usercartadd, usercartdelete, usercartclear, usercartdecreement, userlogout } = require('../controllers/userController')

// Middlewares
const userAuth = require('../middlewares/userAuth')

const upload = require('../middlewares/multerLogic')

router.post('/signup', upload.single('image'), usersignup)

router.post('/signin', usersignin)

router.get("/account", userAuth, useraccount)

router.get("/cart", userAuth, usercart)

router.post("/cart/add", userAuth, usercartadd)

router.delete("/cart/delete", userAuth, usercartdelete)

router.delete("/cart/clear", userAuth, usercartclear)

router.delete("/cart/decreement", userAuth, usercartdecreement)

router.delete("/logout", userAuth, userlogout)

module.exports = router