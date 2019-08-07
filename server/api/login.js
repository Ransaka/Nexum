const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')


/**
 * Login endpoint.
 *
 * Verify given user credentials and provide JWT token.
 *
 * @body User credentials (username and password)
 * @response JWT token
 */
router.post('/login', function (req, res) {
    if (!!req.body.username && !!req.body.password) {
        User.findOne({
                username: req.body.username
            })
            .exec((err, user) => {
                if (!!err || user == null) {
                    if (err && err.kind !== 'ObjectId') {
                        return res.status(500).send({
                            message: 'Error retrieving User with Username = ' + req.body.username
                        })
                    }
                    return res.status(500).send({
                        message: 'Username not found'
                    })
                }

                bcrypt.compare(req.body.password, user.password).then(function (result) {
                    if (result) {
                        var token = jwt.sign({
                            id: user._id,
                            isAdmin: !!user.isAdmin
                        }, 'secret@123', {
                            expiresIn: 86400 // expires in 24 hours
                        })

                        return res.status(200).send({
                            auth: true,
                            accessToken: token,
                            expiresIn: 86400
                        })
                    } else {
                        return res.status(401).send({
                            auth: false,
                            accessToken: null,
                            message: 'Invalid password'
                        })
                    }
                })
            })
    } else {
        res.status(400).send({
            message: 'Missing fields'
        })
    }
})