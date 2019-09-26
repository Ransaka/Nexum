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

var arr = []
async function getTags(textMessage) {

    var options = {
        port: '3000',
        method: 'POST',
        url: 'https://api.textrazor.com/',
        headers: {
            'x-textrazor-key': '51283272e5ba478c5f9e10da3b2695082f057f88f06928e825e0d94f'
        },
        form: {
            extractors: 'entities',
            text: textMessage
        }
    };
    await request(options, function (error, response, body) {
        if (error) throw new Error(error);
        const newData = JSON.parse(body).response.entities;
        for (var i in newData) {
            arr.push(newData[i].entityId)
        }
        return newData
    })
}

/**
 * Set broadcast endpoint.
 *
 * Publish new broadcast message.
 *
 * @body 
 * @response 
 */
router.put('/new', (req, res, next) => {
    getTags("I want DELL laptop")
    User.findById(
            req.headers.uid
        )
        .then((user) => {
            const broadcast = new Broadcast({
                product: req.body.product,
                category: req.body.category,
                tags: req.body.textMessage
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
 * Remove broadcast endpoint.
 *
 * Remove broadcast for the given user id.
 *
 * _id -> UserId
 * rate_id -> RateId 
 * @param id
 * @role Admin
 * @response User of the given id
 */
router.post('/remove', function (req, res) {
    User.findById(req.body._id).exec((err, user) => {
        if (err || user == null) {
            return res.status(500).send({
                message: 'Error removing broadcast'
            })
        }
        Broadcast.remove({
            _id: req.body.broadcast_id
        }).exec().then(result => {
            res.status(200).json(result)
        })

    })
})


/**
 * Get all the elements of broadcast array reversed
 *
 * 
 *
 * @role User
 * @response User of the authenicated user
 */
router.get('/all', verify.decodeToken, function (req, res) {
    User.findById(req.uid).exec((err, user) => {
        if (err) {
            return res.status(500).send({
                message: 'Error retrieving User with id: ' + req.uid
            })
        }
        // Remove password attribute from the user
        user.password = undefined
        var broadcast = {
            broadcast: user.broadcasts.reverse()
        }
        res.status(200).send(broadcast)
    })
})

/**
 * Get broadcast by id endpoint.
 *
 * 
 *
 * @role User
 * @response User of the authenicated user
 */
router.get('/:id', verify.decodeToken, function (req, res) {

    User.findOne({
        _id: req.headers.uid
    }, {
        broadcasts: {
            $elemMatch: {
                "_id": mongoose.Types.ObjectId(req.params.id)
            }
        }
    }).exec((err, broadcast) => {
        if (err) {
            return res.status(500).send({
                message: 'Error retrieving User with id: '
            })
        }
        res.status(200).send(broadcast.broadcasts)
    })
})

module.exports = router