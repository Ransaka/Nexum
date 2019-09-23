const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Selling = require('../models/Selling')
const checkAuth = require('../auth/check-auth')


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
                product: req.body.item,
                category: req.body.item,
                tags: req.body.item
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
router.get('/:id', checkAuth, function (req, res) {
    User.findById(req.params['id']).exec((err, user) => {
        if (err || user == null) {
            return res.status(500).send({
                message: 'Error retrieving User with id:' + req.params['id']
            })
        }
        // Remove password attribute from the user
        user.password = undefined
        res.status(200).send(user.selling)
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