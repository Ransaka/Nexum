const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Selling = require('../models/Selling')


/**
 * Set broadcast endpoint.
 *
 * Publish new broadcast message.
 *
 * @body 
 * @response 
 */
router.put('/selling', (req, res, next) => {
    User.findById(
            req.body._id
        )
        .then(async (user) => {
            const sell = new Selling({
                name: req.body.item
            })
            return user.updateOne({
                $addToSet: {
                    selling: sell
                }
            }).then(() => {
                res.status(200).send({
                    message: 'Item added to selling'
                })
            })
        }).catch(() => {
            res.status(500).send({
                message: 'Item adding error.'
            })
        })
})

module.exports = router