const express = require('express')
const router = express.Router()
const User = require('../models/User')

/**
 * User get user by id endpoint.
 *
 * Get the user for the given user id.
 *
 * @param id
 * @role Admin
 * @response User of the given id
 */
router.get('/:id', function (req, res) {
    User.findById(req.params['id']).exec((err, user) => {
        if (err || user == null) {
            return res.status(500).send({
                message: 'Error retrieving User with id:' + req.params['id']
            })
        }
        // Remove password attribute from the user
        user.password = undefined
        res.status(200).send(user)
    })
})


/**
 * Users update current endpoint.
 *
 * Update the given attributes of the authenticated user.
 *
 * @body User data model exept id, password and isAdmin.
 * @role User
 */
router.put('/current', function (req, res) {
    User.findById(req.body.uid).then(async (user) => {
        //Edit firstname
        if (req.body.firstname) {
            user.firstname = req.body.firstname
        }

        // Edit lastname
        if (req.body.lastname) {
            user.lastname = req.body.lastname
        }

        //Edit username
        if (req.body.username) {
            const existingUser = await User.findOne({
                username: req.body.username
            })
            if (existingUser) {
                return res.status(400).send({
                    message: 'Username is already in taken!'
                })
            }
            user.username = req.body.username
        }

        // Edit email
        if (req.body.email) {
            const existingUser = await User.findOne({
                email: req.body.email
            })
            if (existingUser) {
                return res.status(400).send({
                    message: 'Email is already in taken!'
                })
            }
            user.email = req.body.email
        }

        return user.save().then(() => {
            res.status(200).send({
                message: 'Success, User updated!'
            })
        })
    }).catch(() => {
        res.status(500).send({
            message: 'User update error.'
        })
    })
})


module.exports = router