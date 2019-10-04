const mongoose = require('mongoose')

/**
 * Data model for SellerRelpy.
 */

const Schema = mongoose.Schema
const sellerRelpySchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        createIndex: true,
        required: true,
        auto: true
    },
    productID: String,
    sellerID: String,
    product: String,
    category: String,
    price: Number,
    textMessage: String,
})
module.exports = mongoose.model('SellerRelpy', sellerRelpySchema, 'sellerrelpy')