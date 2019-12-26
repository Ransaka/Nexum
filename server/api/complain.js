const express = require('express');
const router = express.Router()
const mongoose = require('mongoose')
const app = express()
//const user  = require('../models/user')
const complain = require('../models/complain')
const chekAuth  = require('../auth/check-auth')

router.post("/", async (req,res)=>{
    const Complain =new complain({
        complain: req.body.complain,
        seller: req.body.seller       
    });
    Complain.save().then(data=>{
        res.json(data);
    }).catch(err=>{
        res.json({message: err})
    });
});
 router.get('/get', async(req,res)=>{
     try{
         const Complain = await complain.find();
         res.send(Complain);
     }catch(err){
        res.json({message: err});
     }
 });
 //delete complain
 router.delete('/:complainId', async(req,res)=>{
     console.log("complain deleted:")
     try{
         const removedcomplain = await complain.remove({
             _id: req.params.complainId
         });
     }catch(err){
         res.json({
             message: err
         });
     }
 });
 router.put('/update',async (req,res,next)=>{
     complain.findById(req.body.ref,(err,complain)=>{
        if(err)
            res.status(500).json({message: err});
        complain.warningSent= true;
        complain.save((err,complain)=>{
             if(err)
                res.status(500).json({message: err})
                res.status(200).json({msg: complain});
        });
     });
});

 
 module.exports = router