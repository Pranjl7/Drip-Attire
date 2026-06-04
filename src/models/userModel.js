const mongoose = require("mongoose");
const { string } = require("zod");
let objectId = mongoose.Schema.Types.ObjectId;

let userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  emailid: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  contactno: { type: String, required: true },
  image: { type: String, required: false },
  imageid: { type: string },
  cart: [
    {
      type: objectId,
      ref: "Product",
    },
  ],
});

let User = mongoose.model("User", userSchema);
module.exports = User;
