const express = require('express')
const router = express.Router()

const User = require('../../models/User')

/**
 * Set to history.
 *
 *
 *
 * @body 
 * @response 
 */
router.put('/new', (req, res, next) => {
    console.log(req.body)
    User.findById(
            req.headers.uid // Id of the current user
        )
        .then((user) => {
            return user.updateOne({
                $addToSet: {
                    purchaseHistory: req.body
                }
            }).then(() => {
                res.status(200).send({
                    message: 'Form added'
                })
            })
        }).catch(() => {
            res.status(500).send({
                message: 'Form adding error.'
            })
        })
})

/**
 * 
 *
 * 
 *
 * @role User
 * @response User of the authenicated user
 */
router.get('/getPurchaseHistory', function (req, res) {
    User.findById(req.headers.uid).exec((err, user) => {
        if (err) {
            return res.status(500).send({
                message: 'Error retrieving User with id: ' + req.uid
            })
        }
        // Remove password attribute from the user
        user.password = undefined
        res.status(200).send(user.purchaseHistory.reverse())
    })
})

module.exports = router