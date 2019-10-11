const express = require('express')
const router = express.Router()
const User = require('../models/User')
const multer = require('multer')
const checkAuth = require('../auth/check-auth')
const verify = require('../auth/verify')
const bcrypt = require('bcrypt')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
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
        var details = {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            nic: user.nic,
            telephone: user.telephone,
            line1: user.line1,
            line2: user.line2,
            line3: user.line3,
            profileImage: user.profileImage
        }
        res.status(200).send(details)
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
    User.findById(req.uid).select('email').exec((err, user) => {
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




/**
 * Users update current endpoint.
 *
 * Update the given attributes of the authenticated user.
 *
 * @body User data model exept id, password and isAdmin.
 * @role User
 */
router.put('/edit', function (req, res) {
    User.findById(req.headers.uid).exec(async (err, user) => {
        if (err || user == null) {
            return res.status(500).send({
                message: 'Error updating User with id: ' + req.headers.uid
            })
        }
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

        if (req.body.password) {
            bcrypt.hash(req.body.password, 10).then((hash) => {
                user.password = hash
                user.save().then(() => {
                    return res.status(200).send({
                        message: 'Success, Password changed!'
                    })
                })
            })
        }

        // Edit NIC
        if (req.body.nic) {
            user.nic = req.body.nic
        }

        // Edit Telephone
        if (req.body.telephone) {
            user.telephone = req.body.telephone
        }

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

        user.save().then(() => {
            res.status(200).send({
                message: 'Success, User updated!'
            })
        }).catch(() => {
            res.status(500).send({
                message: 'User update error.'
            })
        })
    })
})

// Upload a profile image
router.post('/upload', upload.single('image'), function (req, res, next) {
    console.log(req)
    User.findById(req.headers.uid).exec(async (err, user) => {
        if (err || user == null) {
            return res.status(500).send({
                message: 'Error updating User with id: ' + req.headers.uid
            })
        }
        console.log(user)
        // Edit Profile image
        if (req.file) {
            console.log(req.file.path)
            user.profileImage = req.file.path
        }

        user.save().then(() => {
            res.status(200).send({
                message: 'Success, User updated!'
            })
        }).catch(() => {
            res.status(500).send({
                message: 'User update error.'
            })
        })
    })
})


/**
 * Users get user by username endpoint.
 *
 * 
 *
 * @role User
 * @response User of the authenicated user
 */
router.get('/search/:username', verify.decodeToken, function (req, res) {
    User.find({
        username: req.params.username
    }).exec((err, user) => {
        if (err) {
            return res.status(500).send({
                message: 'Error retrieving User with id: '
            })
        }
        // Remove password attribute from the user
        user[0].password = undefined
        var details = {
            _id: user[0]._id,
            firstname: user[0].firstname,
            lastname: user[0].lastname,
            username: user[0].username,
            email: user[0].email,
            telephone: user[0].telephone,
            line1: user[0].line1,
            line2: user[0].line2,
            line3: user[0].line3
        }
        console.log(details)
        res.status(200).send(details)
    })
})

/**
 * Get all users endpoint.
 *
 * 
 *
 * @role User
 * @response User of the authenicated user
 */
router.get('/all', verify.decodeToken, function (req, res) {
    User.find().exec((err, users) => {
        if (err) {
            return res.status(500).send({
                message: 'Error retrieving User with id: '
            })
        }
        res.status(200).send(users)
    })
})

module.exports = router