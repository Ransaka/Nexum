const mongoose = require('mongoose')

/**
 * Data model for Reply.
 */

const Schema = mongoose.Schema
const replySchema = new Schema({
    
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        createIndex: true,
        required: true,
        auto: true
    },
     
    nom: Number,
    reply: String,
    date: Date
})
module.exports = mongoose.model('Replying', replySchema, 'reply')