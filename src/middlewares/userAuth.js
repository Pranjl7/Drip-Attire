const jwt = require('jsonwebtoken')
const User = require('../models/userModel');
const JWT_SECRET = process.env.USER_JWT_SECRET

function userAuth(req, res, next) {
    try {
        let token = req.cookies.token

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(404).json({
                    success: false,
                    message: "Signin Required."
                })

            } else {
                User.findOne({
                    emailid: decoded
                })
                    .then((user) => {
                        if (user) {
                            req.userid = decoded
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

module.exports = userAuth