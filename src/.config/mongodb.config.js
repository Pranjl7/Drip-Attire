const mongoose = require('mongoose')
let connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB Connected.")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB