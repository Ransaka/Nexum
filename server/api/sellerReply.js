const express = require('express')
const router = express.Router()

const User = require('../models/User')
const SellerReply = require('../models/SellerReply')

/**
 * Set seller reply endpoint.
 *
 * 
 *
 * @body 
 * @response 
 */
router.put('/newreply', (req, res, next) => {
    console.log(req.body)
    User.findById(
            req.body.userID //Id of the customer
        )
        .then(async (user) => {
            const reply = new SellerReply({
                productID: req.body.productID,
                sellerID: req.headers.uid,
                product: req.body.product,
                category: req.body.category,
                price: req.body.price,
                textMessage: req.body.textMessage,
            })
            return user.update({
                $addToSet: {
                    sellerReply: reply
                }
            }).then(() => {
                res.status(200).send({
                    user
                })
            })
        }).catch(() => {
            res.status(500).send({
                message: 'Item adding error.'
            })
        })
})


/**
 * Find the replies for the product
 *
 * Return true if bookmarked else return false
 *
 * @param id
 * @role Admin
 * @response User of the given id
 */
router.get('/view/:id', function (req, res) {
    User.findOne({
        _id: req.headers.uid
    }, {
        sellerReply: {
            $elemMatch: {
                userID: req.params.id
            }
        }
    }).exec((err, broadcast) => {
        if (err) {
            return res.status(500).send({
                message: 'Error retrieving User with id: '
            })
        }
        var item = {
            item: broadcast.broadcasts
        }
        res.status(200).send(broadcast)
    })
})

module.exports = router