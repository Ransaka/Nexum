const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
var request = require('request');


const User = require('../models/User')
const Broadcast = require('../models/Broadcast')

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
router.put('/broadcast', (req, res, next) => {
    //let y = getTags("I want DELL laptop")
    User.findById(
            req.body._id
        )
        .then((user) => {
            const broadcast = new Broadcast({
                name: req.body.textMessage
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