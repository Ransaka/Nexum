const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const verify = require('../../auth/verify')

const User = require('../../models/User')
const Selling = require('../../models/Selling')
const checkAuth = require('../../auth/check-auth')
const SellerReply = require('../../models/SellerReply')
const mongoose = require('mongoose')
const Finalizing = require('../../models/Finalizing')



/**
 * Set selling endpoint.
 *
 * Publish new selling item.
 *
 * @header uid
 * @body product,category,textMessage
 * @response message
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
                    message: 'Item added to selling array'
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
 * Get a selling item endpoint.
 *
 * by id.
 *
 * @param id
 * @role Admin
 * @response User of the given id
 */
router.get('/:id', verify.decodeToken, function (req, res) {
    User.findOne({
        _id: req.headers.uid
    }, {
        selling: {
            $elemMatch: {
                _id: mongoose.Types.ObjectId(req.params.id)
            }
        }
    }).exec((err, item) => {
        if (err) {
            return res.status(500).send({
                message: 'Error retrieving User with id: '
            })
        }
        var itemDetails = {
            item: item.selling
        }
        res.status(200).send(itemDetails)
    })
})

/**
 * Remove selling endpoint.
 *
 * Remove selling for the given user id.
 *
 * _id -> UserId
 * rate_id -> RateId 
 * @param id
 * @role Admin
 * @response User of the given id
 */
router.delete('/remove/:selling_id', function (req, res) {
    User.update({
        _id: req.headers.uid
    }, {
        $pull: {
            selling: {
                _id: mongoose.Types.ObjectId(req.params.selling_id)
            }
        }
    }).exec((err, user) => {
        if (err || user == null) {
            return res.status(500).send({
                message: 'Error removing broadcast'
            })
        }
        res.send(user)

    })
})
/**
 * New finalizing form endpoint.
 *
 * 
 *
 * @header uid
 * @body product,category,textMessage
 * @response message
 */
router.put('/newfinalizing', (req, res, next) => {
    console.log(req.body.customerId)
    User.findById(
            req.body.customerId
        )
        .then(async (user) => {
            const finalizingData = new Finalizing({
                productId: req.body.productId,
                product: req.body.product,
                category: req.body.category,
                sellerId: req.headers.uid,
                sellerName: req.body.sellerName,
                price: req.body.price,
                tags: req.body.tags,
                textMessage: req.body.textMessage,
                date: Date()
            })
            return user.updateOne({
                $addToSet: {
                    finalized: finalizingData
                }
            }).then(() => {
                res.status(200).send({
                    message: 'Item added to finalized array'
                })
            })
        }).catch(() => {
            res.status(500).send({
                message: 'Item adding error.'
            })
        })
})

module.exports = router