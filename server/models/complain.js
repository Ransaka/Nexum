const mongoose = require('mongoose')

/**
 * Data model for Rates.
 */

const Schema = mongoose.Schema
const complainschema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        createIndex: true,
        required: true,
        auto: true
    },
    Complain: String,
    // date: Date
})
module.exports = mongoose.model('complain', complainschema, 'Complain')