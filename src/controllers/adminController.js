const Admin = require('../models/adminModel')
const Product = require('../models/productModel')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.ADMIN_JWT_SECRET
const bcrypt = require('bcrypt')


// zod validation
const { adminsignupSchema, adminsigninSchema } = require('../utils/zodValidation')

async function adminsignup(req, res) {
    try {
        let name = req.body.name
        let emailid = req.body.emailid
        let password = await bcrypt.hash(req.body.password, 10)
        let check = adminsignupSchema.safeParse(req.body)
        if (check.success) {
            await Admin.create({
                name,
                emailid,
                password
            })
            res.status(200).json({
                success: true,
                message: "Admin Signed up successfully."
            })
        }
        else {
            res.status(404).json({
                success: false,
                message: "Password should be atlest 8 digit with one uppercase, lowercase and special case character."
            })
        }
    } catch (error) {
        if (error.code == '11000') {
            res.status(404).json({
                success: false,
                message: "EmailId already exists."
            })
        } else {
            res.status(500).json({
                success: false,
                message: "Something went wrong. Please try again."
            })
        }
    }
}

async function adminsignin(req, res) {
    try {
        let emailid = req.body.emailid
        let password = req.body.password
        let check = adminsigninSchema.safeParse(req.body)
        if (check.success) {
            let admin = await Admin.findOne({
                emailid
            })
            if (admin) {
                let Pcheck = await bcrypt.compare(password, admin.password)
                if (Pcheck) {
                    let token = jwt.sign(emailid, JWT_SECRET)

                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: true,
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                        sameSite: "strict"
                    })
                    res.status(200).json({
                        success: true,
                        message: "Signed in Successfully."
                    })
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Invalid password."
                    })
                }
            } else {
                res.status(404).json({
                    success: false,
                    message: "Admin does not exist, Signup first."
                })
            }
        }
        else {
            res.status(404).json({
                success: false,
                message: "Password should be atlest 8 digit with one uppercase, lowercase and special case character."
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        })
    }
}

async function adminaccount(req, res) {
    try {
        let emailid = req.adminid
        let admin = await Admin.findOne({ emailid }).populate('createdproducts')
        res.status(200).json({
            success: true,
            message: admin
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        })
    }
}

async function admincreate(req, res) {
    try {
        let emailid = req.adminid
        let admin = await Admin.findOne({
            emailid
        })
        let name = req.body.name
        let description = req.body.description
        let price = req.body.price
        let image = `/assets/uploads/${req.file.filename}`
        let seller = admin._id.toString()

        let product = await Product.create({
            name,
            description,
            price,
            image,
            seller
        })

        await Admin.updateOne(
            { _id: admin._id.toString() },
            {
                "$push": {
                    createdproducts: product._id.toString()
                }
            }
        )

        res.status(200).json({
            success: true,
            message: `${description} Added to Collection.`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        })
    }
}

async function admindelete(req, res) {
    try {
        let emailid = req.adminid
        let admin = await Admin.findOne({ emailid })
        let adminobjectid = admin._id.toString()
        let productid = req.body.productid

        let Dproduct = await Product.deleteOne({
            _id: productid,
            seller: adminobjectid
        })

        if (Dproduct.deletedCount == 1) {
            await Admin.updateOne(
                { _id: admin._id.toString() },
                {
                    "$pull": {
                        createdproducts: productid
                    }
                }
            )
            res.status(200).json({
                success: true,
                message: `${Dproduct.deletedCount} Product Deleted successfully.`
            })
        }
        else {
            res.status(404).json({
                success: false,
                message: "Product not found."
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        })
    }
}

async function adminclear(req, res) {
    try {
        let emailid = req.adminid
        let admin = await Admin.findOne({ emailid })
        let adminobjectid = admin._id.toString()
        let Dproduct = await Product.deleteMany({
            seller: adminobjectid
        })
        if (Dproduct.deletedCount > 0) {
            await Admin.updateOne(
                { _id: adminobjectid },
                {
                    "$set": {
                        createdproducts: []
                    }
                }
            )
            res.status(200).json({
                success: true,
                message: `${Dproduct.deletedCount} Product Deleted successfully.`
            })
        }
        else {
            res.status(404).json({
                success: false,
                message: "No Product to be deleted."
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        })
    }
}

async function adminlogout(req, res) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });

        res.status(200).json({
            success: true,
            message: "Logged out Successfully."
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        })
    }
}

module.exports = {
    adminsignup,
    adminsignin,
    adminaccount,
    admincreate,
    admindelete,
    adminclear,
    adminlogout
}