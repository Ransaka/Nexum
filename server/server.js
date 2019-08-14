const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const PORT = 3000
const api = require('./routes/api')
const signupRoutes = require('./api/signup')
const loginRoutes = require('./api/login')
const usersRouter = require('./api/user')
const broadcastRouter = require('./api/broadcast')
const sellingRouter = require('./api/selling')



// Initialize the app
const app = express()

// Setup loggers and data parsers
app.use(cors())
app.use(bodyParser.json())


// Setup router to the endpoints
app.use('/api', api)
app.use('/user', signupRoutes)
app.use('/user', loginRoutes)
app.use('/user', usersRouter)
app.use('/user', broadcastRouter)
app.use('/user', sellingRouter)



app.get('/', function (req, res) {
    res.send("Hello")
})

app.listen(PORT, function (req, res) {
    console.log('Server on port ' + PORT)
})