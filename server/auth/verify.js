const jwt = require('jsonwebtoken')
const User = require('../models/User')

const dotenv = require('dotenv');
dotenv.config();

/**
 * Handler to check the availability of email and password
 */
const checkDuplicateUserNameOrEmail = (req, res, next) => {
    User.findOne({
            username: req.body.username
        })
        .exec((err, user) => {
            if (err && err.kind !== 'ObjectId') {
                res.status(500).send({
                    message: 'Error retrieving User with Username = ' + req.body.username
                })
                return
            }

            if (user) {
                res.status(400).send({
                    message: 'Username is already in taken!'
                })
                return
            }

            User.findOne({
                    email: req.body.email
                })
                .exec((err, user) => {
                    if (err && err.kind !== 'ObjectId') {
                        res.status(500).send({
                            message: 'Error retrieving User with Email = ' + req.body.email
                        })
                        return
                    }

                    if (user) {
                        res.status(400).send({
                            message: 'Email is already in use!'
                        })
                        return
                    }

                    next()
                })
        })
}


/**
 * Handler to verify the JWT token, and retrive user information
 */
const decodeToken = (req, res, next) => {
    let token = req.headers['x-access-token']

    if (!token) {
        return res.status(403).send({
            auth: false,
            message: 'No token provided.'
        })
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: 'Fail to Authentication. Error -> ' + err
            })
        }
        req.uid = decoded.id
        if (!req.uid) {
            return res.status(401).send({
                message: 'Invalid user.'
            })
        }
        next()
    })
}


const verify = {}
verify.decodeToken = decodeToken
module.exports = verify