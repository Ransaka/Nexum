const Bookmark = require('../models/Bookmark')
const express = require('express')
const router = express.Router()

const User = require('../models/User')



/**
 * Set broadcast endpoint.
 *
 * Add a new user to bookmarks.
 *
 * @body 
 * @response 
 */
router.put('/new', (req, res, next) => {
    User.findById(
            req.headers.uid // Id of the current user
        )
        .then((user) => {
            const bookmark = new Bookmark({
                userID: req.body.userID,
                username: req.body.username
            })
            return user.updateOne({
                $addToSet: {
                    bookmarks: bookmark
                }
            }).then(() => {
                res.status(200).send({
                    message: 'User added to bookmarks'
                })
            })
        }).catch(() => {
            res.status(500).send({
                message: 'User adding error.'
            })
        })
})


/**
 * Find if Bookmarked
 *
 * Return true if bookmarked else return false
 *
 * @param id
 * @role Admin
 * @response User of the given id
 */
router.post('/findIfBookmarked', function (req, res) {
    User.find({
        bookmarks: {
            $elemMatch: {
                "userID": req.body.userid
            }
        }
    }).exec((err, user) => {
        if (err) {
            return res.status(500).send({
                message: 'No'
            })
        }
        if (user.length == 0) {
            return res.status(200).send({
                value: false
            })
        } else {
            return res.status(200).send({
                value: true
            })
        }

    })
})

/**
 * Get all bookmarks endpoint.
 *
 * 
 *
 * @body 
 * @response 
 */
router.get('/getBookmarks', function (req, res) {
    User.findById(req.headers.uid).exec((err, user) => {
        if (err) {
            return res.status(500).send({
                message: 'Error retrieving User with id: ' + req.uid
            })
        }
        // Remove password attribute from the user
        user.password = undefined
        var bookmarks = {
            bookmark: user.bookmarks.reverse()
        }
        res.status(200).send(bookmarks)
    })
})

/**
 * Cars delete endpoint.
 *
 * Delete the car referenced to the given car id which is owned by authenticated user.
 *
 * @param id
 * @role User
 */
router.post('/delete/:id', function (req, res) {
    console.log('asd' + req.headers.uid)
    User.update({
        "_id": req.headers.uid
    }, {
        $pull: {
            bookmarks: {
                userID: req.params.id
            }
        }
    }).exec((err, user) => {
        if (err) {
            return res.status(500).send({
                message: 'Error removing bookmark'
            })
        }
        return res.status(200).send(
            user
        )
    })
})

module.exports = router