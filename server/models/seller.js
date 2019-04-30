const mongoose = require('mongoose')

const Schema = mongoose.Schema
const sellerSchema = new Schema({
    shop_name: String,
    identification_number: String,
    password: String,
    email: String,
    telephone: String,
    line1: String,
    line2: String,
    city: String,
    province: String

})

module.exports = mongoose.model('seller',sellerSchema,'seller')