const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const verify = require('../auth/verify')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
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

        console.log(user.selling)
        var array = new Array()
        var i;
        for (i = 0; i < items.selling.length; i++) {
            console.log(i + items.selling[i].product)
            // Finding the related broadcasts
            User.find({
                broadcasts: {
                    $elemMatch: {
                        "product": items.selling[i].product
                    }
                }
            }).exec((err, user) => {
                if (err) {
                    return res.status(500).send({
                        message: 'Error retrieving User with id: '
                    })
                }
                array.push(user)
                console.log(array)
            })
        }
        console.log(array)
        res.status(200).send(array)
    })
})

///////////////////////////////////////////////////////////////////////////////////////

router.get('/test', async function (req, res) {
    array = new Array()
    await User.findById({
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

        var i;
        for (i = 0; i < items.selling.length; i++) {
            // Finding the related broadcasts
            array.push(items.selling[i].product)
            console.log(items.selling[i].product)
        }

        res.status(200).send(array)
    })


})

router.post('/test1', function (req, res) {
    retArray = new Array()
    User.find({
        broadcasts: {
            $elemMatch: {
                "product": req.body.element
            }
        }
    }).exec((err, user) => {
        if (err) {
            return res.status(500).send({
                message: 'Error retrieving User with id: '
            })
        }

        array = new Array()
        user.forEach(element => {
            var response = {
                userID: element._id,
                username: element.username
            }
            array.push(response)
        })
        if (array.length > 0) {
            res.status(200).send(array)
        } else {
            array.push('empty')
            res.status(200).send(array)
        }

    })


})

router.post('/getFinalizingForms', function (req, res) {
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

        var forms = {
            form: user.sellerReply
        }

        res.status(200).send(forms)
    })


})

module.exports = router