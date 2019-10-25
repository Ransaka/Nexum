const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
var request = require('request')
const verify = require('../auth/verify')
const mongoose = require('mongoose')



const User = require('../models/User')
const Broadcast = require('../models/Broadcast')
const checkAuth = require('../auth/check-auth')

/**
 * Cars delete endpoint.
 *
 * Delete the car referenced to the given car id which is owned by authenticated user.
 *
 * @param id
 * @role User
 */
router.get('/all', function (req, res) {
    User.find({
        _id: req.headers.uid

    }).exec((err, finalizedItem) => {
        if (err) {
            return res.status(500).send({
                message: 'Error retrieving User with id: '
            })
        }
        var item = {
            item: finalizedItem[0].finalized
        }
        res.status(200).send(item)
    })


})

router.get('/:id', function (req, res) {
    User.findOne({
        _id: req.headers.uid
    }, {
        finalized: {
            $elemMatch: {
                productId: req.params.id
            }
        }
    }).exec((err, finalizedItem) => {
        if (err) {
            return res.status(500).send({
                message: 'Error retrieving User with id: '
            })
        }
        var item = {
            item: finalizedItem.finalized
        }
        res.status(200).send(item)

    })


})


module.exports = router