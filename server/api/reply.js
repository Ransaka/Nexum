const express = require('express')
const router = express.Router()

const Reply = require('../models/Reply')
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
            var _reply = new Reply({
                nom: req.body.nom,
                reply: req.body.reply,
                date: Date()
            })
            return user.updateOne({
                $addToSet: {
                    replying: _reply
                }
            }).then(() => {
                res.status(200).send({
                    message: 'Replying added'
                })
            })
        }).catch(() => {
            res.status(500).send({
                message: 'Replying error.'
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
                message: 'Error removing reply'
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
                'user.replying': {
                    reply_id: req.body.reply_id
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
                message: 'Error retrieving replying'
            })
        }
        res.status(200).send(user.replying)
    })
})


module.exports = router