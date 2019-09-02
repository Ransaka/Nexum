const express = require('express')
const router = express.Router()
const User = require('../models/User')
const multer = require('multer')
const checkAuth = require('../auth/check-auth')
const verify = require('../auth/verify')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage: storage
})

/**
 * Users get current endpoint.
 *
 * Get user details of authenticated user.
 *
 * @role User
 * @response User of the authenicated user
 */
router.get('/current', verify.decodeToken, function (req, res) {
    User.findById(req.uid).exec((err, user) => {
        if (err) {
            return res.status(500).send({
                message: 'Error retrieving User with id: ' + req.uid
            })
        }
        // Remove password attribute from the user
        user.password = undefined
        // var details = {
        //     username: user.username,
        //     email: user.email
        // }
        res.status(200).send(user)
    })
})

/**
 * User get user by id endpoint.
 *
 * Get the user details for the given user id.
 *
 * @param id
 * @role Admin
 * @response User of the given id
 */
router.get('/:id', function (req, res) {
    User.findById(req.params['id']).select('email').exec((err, user) => {
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
router.post('/edit', verify.decodeToken, /*upload.single('userImage')*/ function (req, res) {
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

        // Edit Telephone
        /*if (req.body.telephone) {
            user.telephone = req.body.telephone
        }*/

        // Edit Address Line 1
        if (req.body.line1) {
            user.line1 = req.body.line1
        }

        // Edit Address Line 2
        if (req.body.line2) {
            user.line2 = req.body.line2
        }

        // Edit Address Line 3
        if (req.body.line3) {
            user.line2 = req.body.line2
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


/**
 * Remove User current endpoint.
 *
 * Remove the given user of the authenticated user.
 *
 * @body User data model exept id, password and isAdmin.
 * @role User
 */
router.delete('/delete/:id', checkAuth, (req, res, next) => {
    User.remove({
        _id: req.params.id
    }).exec().then(result => {
        res.status(200).json({
            message: 'User Deleted'
        })
    }).catch(() => {
        res.status(500).send({
            message: 'User deletion error.'
        })
    })
})

module.exports = router