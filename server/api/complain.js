const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const app = express()
const Rate = require('../models/Rate')
const User = require('../models/User')
const complain = require('../models/complain')
const checkAuth = require('../auth/check-auth')



//submit a complain 

router.post("/",(req, res) => {
  
  const Complain = new complain({
    complain: req.body.complain,
    id: req.body.id,
    seller: req.body.seller,
    item: req.body.item

  });

  Complain.save()
  .then(data=>{
    res.json(data);
  }).catch(err=>{
    res.json({message: err})
  });
  });



  //list all the complains


  router.get('/get', async(req, res)=>{
    try{
      const Complain = await complain.find();
      res.json(Complain);
    }catch(err){
      res.json({message: err});
    }
  });



  //specific compalin
router.get('/:ComplainId', async (req, res)=>{
  try{
    const Complain = await complain.findById(req.params.ComplainId);
    res.json(Complain)
  }catch (err){
    res.json({message: err});
  }

});

module.exports = router