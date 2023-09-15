var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const AdminLog = require('../Model/adminSchema')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message:"Server is On"});
});
router.post('/login', async function(req, res, next) {
  const { name, password } = req.body;
  const admin = await AdminLog.findOne({name});
  if(!admin){
    return res.status(400).send('Access Denied!!!name is not valid  ');
  }
  const validPassword = await bcrypt.compare(password,admin.password);
  if(!validPassword){
    return res.status(400).send('Password is incorrect');
  }

  res.send("Login successful");
});

module.exports = router;
