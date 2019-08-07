const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const User = require('../models/User')

/**
 * Sign up end point.
 *
 * Sign up the given user.
 *
 * @body User data model exept id and isAdmin.
 
router.post('/signup', [verify.checkDuplicateUserNameOrEmail], function (req, res) {
    if (!!req.body.username && !!req.body.email && !!req.body.password) {
        bcrypt.hash(req.body.password, 10).then((hash) => {
            const user = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                password: hash,
                email: req.body.email,
                isAdmin: false
            })
            user.save().then(() => {
                res.status(200).send({
                    message: 'Success, User created!'
                })
            })
        }).catch(() => {
            res.status(500).send({
                message: 'User creation error.'
            })
        })
    } else {
        res.status(400).send({
            message: 'Missing fields'
        })
    }
})
*/

/**
 * Sign up end point.
 *
 * Sign up the given user.
 *
 * @body User data model exept id.
 */
router.post('/signup', (req, res, next) => {
    User.find({
        email: req.body.email
    }).exec().then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Email already exists'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    })
                    user.save().then(result => {
                            res.status(201).json({
                                message: 'User created'
                            })
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(500).json({
                                error: err
                            })
                        })
                }
            })
        }
    }).catch()


})

module.exports = router