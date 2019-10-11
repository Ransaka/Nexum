const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const verify = require('../auth/verify')

const User = require('../models/User')
const Selling = require('../models/Selling')
const checkAuth = require('../auth/check-auth')
const SellerReply = require('../models/SellerReply')


/**
 * Set selling endpoint.
 *
 * Publish new selling message.
 *
 * @body 
 * @response 
 */
router.put('/new', (req, res, next) => {
    User.findById(
            req.headers.uid
        )
        .then(async (user) => {
            const sell = new Selling({
                product: req.body.product,
                category: req.body.category,
                tags: req.body.textMessage
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

/**
 * Get all selling items endpoint.
 *
 * Get the user selling for the given user id.
 *
 * @param id
 * @role Admin
 * @response User of the given id
 */
router.get('/all', verify.decodeToken, function (req, res) {
    User.findById(req.uid).exec((err, user) => {
        if (err) {
            return res.status(500).send({
                message: 'Error retrieving User with id:' + req.uid
            })
        }
        // Remove password attribute from the user
        user.password = undefined
        var selling = {
            selling: user.selling.reverse()
        }
        res.status(200).send(selling)
    })
})

/**
 * Remove selling endpoint.
 *
 * Remove selling for the given user id.
 *
 * @param id
 * @role Admin
 * @response User of the given id
 */
router.post('/item', checkAuth, function (req, res) {
    User.findById(req.body._id).exec((err, user) => {
        if (err || user == null) {
            return res.status(500).send({
                message: 'Error removing item:' + req.body.item
            })
        }
        Selling.remove({
            name: req.body.item
        }).exec().then(result => {
            res.status(200).json(result)
        })

    })
})

module.exports = router