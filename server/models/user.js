const mongoose = require('mongoose')

const Schema = mongoose.Schema
const custSchema = new Schema({
    first_name: String,
    last_name: String,
    password: String,
    email: String,
    telephone: String,
    line1: String,
    line2: String,
    city: String,
    province: String

})
module.exports = mongoose.model('user', custSchema, 'customer')