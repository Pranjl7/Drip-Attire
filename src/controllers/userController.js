const User = require('../models/userModel')
const Product = require('../models/productModel')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.USER_JWT_SECRET
const bcrypt = require('bcrypt')

// zod validation
const { usersignupSchema, usersigninSchema } = require('../utils/zodValidation')

async function usersignup(req, res) {
    try {
        let name = req.body.name
        let emailid = req.body.emailid
        let password = await bcrypt.hash(req.body.password, 10)
        let contactno = req.body.contactno
        let image
        if (req.file == undefined) {
            image = '/assets/user-placeholder.png'
        }
        else {
            image = `/assets/uploads/${req.file.filename}`
        }
        let check = usersignupSchema.safeParse(req.body)
        if (check.success) {
            await User.create({
                name,
                emailid,
                password,
                contactno,
                image
            })

            let token = jwt.sign(emailid, JWT_SECRET)
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: "strict"
            })
            res.status(200).json({
                success: true,
                message: "Signed up Successfully."
            })

        }
        else {
            const message = check.error.issues.map(e => e.message)
            res.status(404).json({
                success: false,
                message: message
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

async function usersignin(req, res) {
    try {
        let emailid = req.body.emailid
        let password = req.body.password
        let check = usersigninSchema.safeParse(req.body)
        if (check.success) {
            let user = await User.findOne({
                emailid
            })
            if (user) {
                let Pcheck = await bcrypt.compare(password, user.password)
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
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "User does not exist, Signup first."
                })
            }
        }
        else {
            const message = check.error.issues.map(e => e.message)
            res.status(404).json({
                success: false,
                message: message
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        })
    }
}

async function useraccount(req, res) {
    try {
        let emailid = req.userid
        let user = await User.findOne({ emailid })
        res.status(200).json({
            success: true,
            message: user
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        })
    }
}

async function usercart(req, res) {
    try {
        let emailid = req.userid
        let user = await User.findOne({ emailid }).populate("cart")
        res.status(200).json({
            success: true,
            message: user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        })
    }
}

async function usercartadd(req, res) {
    try {
        let emailid = req.userid
        let productid = req.body.productid
        let user = await User.findOne({ emailid })

        if (user.cart.length >= 10) {
            res.status(404).json({
                success: false,
                message: "Max Size of cart Reached."
            })
        }
        else {
            let Uuser = await User.updateOne(
                { emailid },
                { "$push": { cart: productid } }
            )
            if (Uuser.modifiedCount > 0) {
                let product = await Product.findOne({ _id: productid })
                res.status(200).json({
                    success: true,
                    message: `${product.description} Added to cart.`
                })

            } else {
                res.status(404).json({
                    success: false,
                    message: "Failed to add product to cart."
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        })
    }
}

async function usercartdelete(req, res) {
    try {
        let emailid = req.userid
        let productid = req.body.productid

        let user = await User.updateOne(
            { emailid },
            {
                "$pull": {
                    cart: productid
                }
            }
        )
        if (user.modifiedCount > 0) {
            res.status(200).json({
                success: true,
                message: "Product removed from the cart."
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Something went wrong. Please try again."
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        })
    }
}

async function usercartclear(req, res) {
    try {
        let emailid = req.userid

        let user = await User.updateOne(
            { emailid },
            {
                "$set": {
                    cart: []
                }
            }
        )
        console.log(user)
        if (user.modifiedCount > 0) {
            res.status(200).json({
                success: true,
                message: "All Products removed successfully."
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Cart is empty."
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        })
    }
}

async function usercartdecreement(req, res) {
    try {
        let emailid = req.userid
        let productid = req.body.productid

        let user = await User.findOne({ emailid });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found."
            })
        }

        let index = user.cart.indexOf(productid);
        if (index === -1) {

            return res.status(500).json({
                success: false,
                message: "Product not in cart"
            })
        }


        user.cart.splice(index, 1);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Decreemented Successfully."
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        })
    }
}

async function userlogout(req, res) {
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
    usersignup,
    usersignin,
    useraccount,
    usercart,
    usercartadd,
    usercartdelete,
    usercartclear,
    usercartdecreement,
    userlogout
}