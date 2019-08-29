const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
var request = require('request');


const User = require('../models/User')
const Broadcast = require('../models/Broadcast')
const checkAuth = require('../auth/check-auth')

var arr = []

function getTags(textMessage) {
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
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        const newData = JSON.parse(body).response.entities;
        for (var i in newData) {
            arr.push(newData[i].entityId)
        }
        var x = newData

    })
}

function getTag(textMessage) {
    return new Promise(resolve => {
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
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            const newData = JSON.parse(body).response.entities;
            for (var i in newData) {
                arr.push(newData[i].entityId)
            }
            var x = newData
            return x
        })
        resolve(textMessage);
    });
}

/**
 * Set broadcast endpoint.
 *
 * Publish new broadcast message.
 *
 * @body 
 * @response 
 */
router.put('/', (req, res, next) => {
    getTag("I want a DELL laptop").then((tags) =>
        User.findById(
            req.body._id
        )
        .then((user) => {
            const broadcast = new Broadcast({
                name: textMessage
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
        }))
})


/**
 * User get user broadcasts by id endpoint.
 *
 * Get the user broadcasts for the given user id.
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
        res.status(200).send(user.broadcasts)
    })
})

module.exports = router