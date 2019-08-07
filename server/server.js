const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const PORT = 3000
const api = require('./routes/api')
const userRoutes = require('./api/signup')

// Initialize the app
const app = express()

// Setup loggers and data parsers
app.use(cors())
app.use(bodyParser.json())


// Setup router to the endpoints
app.use('/api', api)
app.use('/user', userRoutes)


app.get('/', function (req, res) {
    res.send("Hello")
})

app.listen(PORT, function (req, res) {
    console.log('Server on port ' + PORT)
})