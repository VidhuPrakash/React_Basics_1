const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({ 
    username: String,
    name: String,
    phoneNumber: String,
    email: String,
    address: String
  });
  var user = mongoose.model("User",UserSchema);
  module.exports=user;