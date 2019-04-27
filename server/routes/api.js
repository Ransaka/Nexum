const express = require('express')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const db = "mongodb://mihiru:mihiru123@ds147946.mlab.com:47946/nexumdb"

mongoose.connect(db, err =>{
    if (err){
        console.error('Error!' + err)
    }else{
        console.log('connected to database')
    }
})

router.get('/',(req,res)=>{
    res.send('From API router')
})

router.post('/register',(req,res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if(error){
            console.log(error)
        }else{
            res.status(200).send(registeredUser)
        }
    })
})

// Login a user
router.post('/login', (req, res) => {
    let userData = req.body

    // Check if the email address exists
    User.findOne({ email: userData.email }, (error, user) => {
        if(error){
            console.log(error)
        }else{
            
           if(!user) {
                // If email do not exists.
                /*
                Direct the user to the signup page
                */
                res.status(401).send('Invalid Email')
           }else if(user.password !== userData.password){
                //If password incorrect
                /*
                Display a message
                */ 
                res.status(401).send('Invalid Password')
           }else{
                // If email exists.
                /*
                Direct the user to the profile
                */
               res.status(200).send(user)
           }
            
        }
    })
})

module.exports = router