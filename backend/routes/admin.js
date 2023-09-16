var express = require('express');
var router = express.Router();
var User = require('../Model/userSchema')

router.get('/',async(req,res)=>{
    const users = await User.find();
    res.send(users);
});
router.post('/', async (req, res) => {
    const newUser = new User(req.body);
    try {
      await newUser.save();
      res.send(newUser);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
router.put('/:id', async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body,{ new: true });
    res.send(updatedUser);
  });
router.delete('/:id', async (req, res) => {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
  res.send(deletedUser);
  });


  module.exports=router;