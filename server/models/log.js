const mongoose = require('mongoose')

const Schema = mongoose.Schema
const logSchema = new Schema({
    email: String,
    password: String,
    
})

module.exports = mongoose.model('log',logSchema,'seller')
// uhvgi