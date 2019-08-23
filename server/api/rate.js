const express = require('express')
const router = express.Router()

const Rate = require('../models/Rate')
const User = require('../models/User')
const checkAuth = require('../auth/check-auth')

/**
 * Set rate and review endpoint.
 *
 * Publish new rating message.
 *
 * _id -> UserId
 * rate, review, date
 * @body 
 * @response 
 */
router.put('/create', (req, res, next) => {
    User.findById(
            req.body._id
        )
        .then((user) => {
            const rate = new Rate({
                rate: req.body.rate,
                review: req.body.review,
                date: Date()
            })
            return user.updateOne({
                $addToSet: {
                    ratings: rate
                }
            }).then(() => {
                res.status(200).send({
                    message: 'Rating added'
                })
            })
        }).catch(() => {
            res.status(500).send({
                message: 'Rating error.'
            })
        })
})

/**
 * Remove review endpoint.
 *
 * Remove review for the given user id.
 *
 * _id -> UserId
 * rate_id -> RateId 
 * @param id
 * @role Admin
 * @response User of the given id
 */
router.post('/remove', function (req, res) {
    User.findById(req.body._id).exec((err, user) => {
        if (err || user == null) {
            return res.status(500).send({
                message: 'Error removing review'
            })
        }
        Ratings.remove({
            _id: req.body.rate_id
        }).exec().then(result => {
            res.status(200).json(result)
        })

    })
})


module.exports = router