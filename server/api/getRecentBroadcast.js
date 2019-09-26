const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const verify = require('../auth/verify')
const mongoose = require('mongoose')


const User = require('../models/User')
const Selling = require('../models/Selling')
const checkAuth = require('../auth/check-auth')


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
    console.log(req.headers.uid)
    User.findById({
        _id: req.headers.uid
    }).exec((err, user) => {
        if (err) {
            return res.status(500).send({
                message: 'Error retrieving User with id:' + req.uid
            })
        }
        // Remove password attribute from the user
        user.password = undefined
        var items = {
            selling: user.selling
        }

        console.log(user.selling.length)

        var i;
        for (i = 0; i < items.selling.length; i++) {
            console.log(items.selling[i].product)

            // Finding the related broadcasts
            User.find({
                broadcasts: {
                    $elemMatch: {
                        "product": items.selling[i].product
                    }
                }
            }).exec((err, broadcast) => {
                if (err) {
                    return res.status(500).send({
                        message: 'Error retrieving User with id: '
                    })
                }
                res.status(200).send(broadcast)
            })
        }
        //res.status(200).send(items)
    })
})




module.exports = router