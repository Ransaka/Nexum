const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Verify = require('../auth/verify')


/**
 * Login endpoint.
 *
 * Verify given user credentials and provide JWT token.
 *
 * @body User credentials (username and password)
 * @response JWT token
 */
router.post('/login', (req, res, next) => {
    User.findOne({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed 1'
                })
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed 2'
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        id: user._id
                    }, 'secret', {
                        expiresIn: '24h'
                    })
                    return res.status(200).json({
                        message: 'Auth Successful',
                        token
                    })
                }
                return res.status(401).json({
                    message: 'Auth failed 3'
                })
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500), json({
                error: err
            })
        })
})



module.exports = router