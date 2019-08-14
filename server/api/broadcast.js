const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Broadcast = require('../models/Broadcast')


/**
 * Set broadcast endpoint.
 *
 * Publish new broadcast message.
 *
 * @body 
 * @response 
 */
router.put('/broadcast', (req, res, next) => {
    User.findById(
            req.body._id
        )
        .then(async (user) => {
            const broadcast = new Broadcast({
                name: req.body.item
            })
            return user.updateOne({
                $addToSet: {
                    broadcasts: broadcast
                }
            }).then(() => {
                res.status(200).send({
                    message: 'Item added to broadcast'
                })
            })
        }).catch(() => {
            res.status(500).send({
                message: 'Item adding error.'
            })
        })
})

/**
 * Get broadcast endpoint.
 *
 * Get a broadcast based on the item.
 *
 * @body 
 * @response 
 */
router.get('/broadcast', (req, res, next) => {
    User.findById(
            req.body._id
        )
        .then(async (user) => {
            const broadcast = new Broadcast({
                name: req.body.item
            })
            return user.updateOne({
                $addToSet: {
                    broadcasts: broadcast
                }
            }).then(() => {
                res.status(200).send({
                    message: 'Item added to broadcast'
                })
            })
        }).catch(() => {
            res.status(500).send({
                message: 'Item adding error.'
            })
        })
})





module.exports = router