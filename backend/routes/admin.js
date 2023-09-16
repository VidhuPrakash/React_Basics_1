// CRUD Opeartion RESTful API
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
    // Server-side validation
    if (!req.body.username || !req.body.name || !req.body.email || !req.body.phoneNumber || !req.body.address) {
      return res.status(400).send({ error: 'Username, name, email, phone number, and address are required.' });
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      console.log(req.body);
      res.send(updatedUser);
    } catch (error) {
      // If there's an error, send it to the client
      res.status(500).send({ error: error.message });
    }
  });

router.delete('/:id', async (req, res) => {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
  res.send(deletedUser);
  });


  module.exports=router;