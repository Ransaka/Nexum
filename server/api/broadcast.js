const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Verify = require('../auth/verify')


/**
 * Set broadcast endpoint.
 *
 * Publish new broadcast message.
 *
 * @body 
 * @response 
 */
router.post('/broadcast', (req, res, next) => {
    User.find({
        _id: req.body.username._id
    }).exec().then(user => {
        if (user.length >= 1) {
            const item = req.body.item
            item.save().then(result => {
                    res.status(201).json({
                        message: 'Item created'
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        error: err
                    })
                })
        }
    })

})



module.exports = router