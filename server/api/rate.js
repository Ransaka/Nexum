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
    console.log(req.body._id)
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
        /*Rate.remove({
                _id: req.body.rate_id
            })
            .exec().then(result => {
                res.status(200).json(result)
            })*/
        user.update({
            _id: req.body._id
        }, {
            $pull: {
                'user.ratings': {
                    rate_id: req.body.rate_id
                }
            }
        });


    })
})

/**
 * User get user broadcasts by id endpoint.
 *
 * Get the user broadcasts for the given user id.
 *
 * @param id
 * @role Admin
 * @response User of the given id
 */
router.get('/:id', function (req, res) {
    User.findById(req.params['id']).exec((err, user) => {
        if (err || user == null) {
            return res.status(500).send({
                message: 'Error retrieving ratings'
            })
        }
        res.status(200).send(user.ratings)
    })
})


module.exports = router