const mongoose = require('mongoose')

/**
 * Data model for Selling Item.
 */

const Schema = mongoose.Schema
const SellingItemSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        createIndex: true,
        required: true,
        auto: true
    },
    name: String
})
module.exports = mongoose.model('SellingItem', SellingItemSchema, 'sellingItem')