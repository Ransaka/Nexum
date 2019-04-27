<<<<<<< HEAD
const express = require('express')
const bodyParser = require('body-parser')

const PORT = 3000
const api = require('./routes/api')
const app = express()

app.use(bodyParser.json())

app.use('/api',api)
app.get('/',function(req, res){
    res.send("Hello")
})

app.listen(PORT, function(req,res){
    console.log('Server running on port ' + PORT)
})

=======
const express = require('express')
const bodyParser = require('body-parser')

const PORT = 3000
const api = require('./routes/api')
const app = express()

app.use(bodyParser.json())

app.use('/api',api)
app.get('/',function(req, res){
    res.send("Hello")
})

app.listen(PORT, function(req,res){
    console.log('Server running on port ' + PORT)
})

>>>>>>> 52234ba5ab363fd3428e0224252bd7ed29bab5d1
