const mongoose = require('mongoose')

/**
 * Data model for Finalizng.
 */

const Schema = mongoose.Schema
const finalizingSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        createIndex: true,
        required: true,
        auto: true
    },
    productId: String,
    product: String,
    category: String,
    sellerId: String,
    sellerName: String,
    price: Number,
    tags: String,
    textMessage: String,
    date: Date

})
module.exports = mongoose.model('Finalizing', finalizingSchema, 'finalizing')