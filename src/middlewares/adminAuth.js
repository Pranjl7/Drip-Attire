const jwt = require('jsonwebtoken')
const Admin = require('../models/adminModel')
const JWT_SECRET = process.env.ADMIN_JWT_SECRET

function adminAuth(req, res, next) {
    try {
        let token = req.cookies.token
        if (!token) {
            res.redirect("/admin/signin")
            return
        }

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(404).json({
                    success: false,
                    message: "Signin Required."
                })

            } else {
                Admin.findOne({
                    emailid: decoded
                })
                    .then((admin) => {
                        if (admin) {
                            req.adminid = decoded
                            next()
                        }
                        else {
                            res.status(404).json({
                                success: false,
                                message: "Signin first"
                            })
                        }
                    })
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        })
    }
}



module.exports = adminAuth