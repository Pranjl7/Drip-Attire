const mongoose = require('mongoose')
let objectId = mongoose.Schema.Types.ObjectId

let adminSchema = new mongoose.Schema({
    name : {type : String, required : true},
    emailid : {type : String, unique : true, required : true},
    password : {type : String, required : true},
    createdproducts : [{
        type : objectId,
        ref : 'Product'
    }],
})

let Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin