const express = require('express')
const Product = require('../models/productModel')
const User = require("../models/userModel")
const Admin = require("../models/adminModel")
const userAuth = require('../middlewares/userAuth')
const adminAuth = require('../middlewares/adminAuth')
let router = express.Router()

router.get('/', (req, res) => {
    res.render('main')
})

router.get("/user/signup", (req, res) => {
    res.render("user-signup-form")
})

router.get("/user/signin", (req, res) => {
    res.render("user-signin-form")
})

router.get("/user/account", (req, res) => {
    res.render("user-account")
})

router.get("/admin/signin", (req, res) => {
    res.render("admin-signin-form")
})

router.get("/admin/account", adminAuth, async (req, res) => {
    let admin = await Admin.findOne({ "emailid": req.adminid }).populate('createdproducts')
    res.render("admin-account", { admin })
})

router.get("/admin/create", (req, res) => {
    res.render("admin-create")
})

router.get("/collection", async (req, res) => {
    let products = await Product.find({})
    res.render("collection", { products })
})

router.get("/cart", (req, res) => {
    res.render("cart")
})

router.get("/checkout", (req, res) => {
    res.render("checkout")
})

router.get("/refundpolicy", (req, res) => {
    res.render("refundpolicy")
})

router.get("/terms-and-conditions", (req, res) => {
    res.render("t&c.ejs")
})

module.exports = router