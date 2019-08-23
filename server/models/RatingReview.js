const mongoose = require('mongoose')

/**
 * Data model for Review.
 */

const Schema = mongoose.Schema
const reviewSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        createIndex: true,
        required: true,
        auto: true
    },
    Rate: Number,
    content: String
})
module.exports = mongoose.model('Review', reviewSchema, 'review')