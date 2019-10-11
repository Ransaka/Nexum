const mongoose = require('mongoose')

/**
 * Data model for User.
 */

const Schema = mongoose.Schema
const userSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        createIndex: true,
        required: true,
        auto: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: String,
    username: String,
    firstname: String,
    lastname: String,
    telephone: String,

    //address
    line1: String,
    line2: String,
    line3: String,

    nic: String,

    broadcasts: [],
    selling: [],
    bookmarks: [],
    sellerReply: [],

    overallrate: Number,
    ratings: [],

    profileImage: String

})
module.exports = mongoose.model('User', userSchema, 'user')