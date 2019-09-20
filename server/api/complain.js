const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const app = express()
const Rate = require('../models/Rate')
const User = require('../models/User')
const complain = require('../models/complain')
const checkAuth = require('../auth/check-auth')




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
  //  const complain = new Complain({

  //   complain: req.body.complain
  //  });
  //  try{
  //    const saved = await complain.save()
  //    res.json(saved);
  //  }catch(error){
  //    res.json({message: error})
  //  }

    // var myData = new Complain(req.body);
    // myData.save()
    //   .then(item => {
    //     res.send("item saved to database");
    //   })
    //   .catch(err => {
    //     res.status(400).send("unable to save to database");
    //   });
  });

module.exports = router