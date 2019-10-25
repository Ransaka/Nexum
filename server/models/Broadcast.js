const mongoose = require('mongoose')

/**
 * Data model for Broadcast.
 */

const Schema = mongoose.Schema
const broadcastSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        createIndex: true,
        required: true,
        auto: true
    },
    product: String,
    category: String,
    tags: []
})
module.exports = mongoose.model('Broadcast', broadcastSchema, 'broadcast')