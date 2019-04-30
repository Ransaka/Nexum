const mongoose = require('mongoose')

const Schema = mongoose.Schema
const logSchema = new Schema({
    username: String,
    password: String,
    
})

module.exports = mongoose.model('log',logSchema,'log')