const mongoose = require('mongoose')
let objectId = mongoose.Schema.Types.ObjectId

let productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    seller: { type: objectId, ref: 'Admin' }
})

let Product = mongoose.model('Product', productSchema)
module.exports = Product