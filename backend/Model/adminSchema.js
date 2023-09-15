var mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
var adminSchema=mongoose.Schema({
    name:String,
    password:String, 
});
var Admin = mongoose.model("Admin",adminSchema);
module.exports = Admin;
