const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Seller = require('../models/seller')
const Log = require('../models/log')
const mongoose = require('mongoose')
//require('../dotenv').config()
const db = "mongodb+srv://nexumuser:" + "nexumuser" + "@nexum-deulb.mongodb.net/test?retryWrites=true&w=majority"

// Connect to mongodb server
mongoose.connect(db, err => {
    if (err) {
        console.error('Error!' + err)
    } else {
        console.log('connected to database')
    }
})

router.get('/', (req, res) => {
    res.send('From API router')
})

router.post('/custsignin', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, signIn) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).send(signIn)
        }
    })
})

router.post('/sellersignin', (req, res) => {
    //extract data from post(req) body
    let sellerData = req.body
    let seller = new Seller(sellerData)
    //save in mongo
    seller.save((error, signIn) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).send(signIn)
        }
    })
})

// Login a user
router.post('/login', (req, res) => {
    let userData = req.body

    // Check if the email address exists
    Seller.findOne({
        email: userData.email
    }, (error, user) => {
        if (error) {
            console.log(error)
        } else {

            if (!seller) {
                // If email do not exists.
                /*
                Direct the user to the signup page
                */
                res.status(401).send('Invalid Email')
            } else if (seller.password !== userData.password) {
                //If password incorrect
                /*
                Display a message
                */
                res.status(401).send('Invalid Password')
            } else {
                // If email exists.
                /*
                Direct the user to the profile
                */
                res.status(200).send(seller)
            }

        }
    })
})

module.exports = router