const mongoose = require('mongoose')

/**
 * Data model for Bookmark.
 */

const Schema = mongoose.Schema
const bookmarkSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        createIndex: true,
        required: true,
        auto: true
    },
    userID: String,
    username: String
})
module.exports = mongoose.model('Bookmark', bookmarkSchema, 'bookmark')