const mongoose = require('mongoose')

/**
 * Data model for Rates.
 */

const Schema = mongoose.Schema
const rateSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        createIndex: true,
        required: true,
        auto: true
    },
    rate: Number,
    content: String,
    date: Date
})
module.exports = mongoose.model('Rating', rateSchema, 'rate')