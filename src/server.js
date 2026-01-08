const express = require('express')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const morgan = require('morgan')
const cookieparser = require('cookie-parser')
const flash = require("connect-flash")
const session = require("express-session")

// routes
const adminRoutes = require('./routes/adminRoutes')
const userRoutes = require('./routes/userRoutes')
const ejsRoutes = require('./routes/ejsRoutes')

// db
const connectDB = require('./.config/mongodb.config');
const app = express()
const port = process.env.PORT || 3000

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public')))
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use(cookieparser())
app.use(session({
    secret: "yourSecret",
    resave: false,
    saveUninitialized: true
}));
app.use(flash())

// routes middleware
app.use("/api/admin", adminRoutes)
app.use("/api/user", userRoutes)
app.use("/", ejsRoutes)


    // Db Connection
    ; (async () => {
        await connectDB()
        app.listen(port, () => {
            console.log(`Server running on : http://localhost:${port}`)
        })
    })()


// app.get("/", (req,res)=>{
//     res.render("collection")
// })