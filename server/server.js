const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')


const PORT = 3000
const api = require('./routes/api')
const signupRoutes = require('./api/signup')
const loginRoutes = require('./api/signup-login/login')
const usersRouter = require('./api/user')
const broadcastRouter = require('./api/customer-components/broadcast')
const sellingRouter = require('./api/seller-components/selling')
const rateRouter = require('./api/rate')
const complainRouter = require('./api/complain')
const getRecentBroadcastRouter = require('./api/getRecentBroadcast')
const bookmarksRouter = require('./api/bookmark')
const sellerReplyRouter = require('./api/sellerReply')
const forgotPasswordMailRouter = require('./api/forgotPasswordMail')
const sendWarningMailRouter = require('./api/mail')

const messageRouter = require('./api/message')
const sellerMessageRouter = require('./api/sellermessage')
const getFinalizingFormsRouter = require('./api/getFinalizingForms')
const paypalRouter = require('./api/paypal')
const historyRouter = require('./api/history/customerHistory')




const replyRouter = require('./api/reply')


// Initialize the app
const app = express()

// Setup loggers and data parsers
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use('/upload', express.static('upload'))


// Setup router to the endpoints
app.use('/api', api)
app.use('/user', signupRoutes)
app.use('/user', loginRoutes)
app.use('/user', usersRouter)
app.use('/user/broadcast', broadcastRouter)
app.use('/user/selling', sellingRouter)
app.use('/user/rate', rateRouter)
app.use('/user/complain', complainRouter)
app.use('/user/getRecentBroadcast', getRecentBroadcastRouter)
app.use('/user/bookmark', bookmarksRouter)
app.use('/user/sellerReply', sellerReplyRouter)
app.use('/forgotPasswordMail', forgotPasswordMailRouter)
//app.use('/user/message', messageRouter)
//app.use('/user/sellermessage', sellerMessageRouter)
app.use('/user/getFinalizingForms', getFinalizingFormsRouter)
app.use('/user/paypal', paypalRouter)
app.use('/user/mail', sendWarningMailRouter)
app.use('/user/complain/', sendWarningMailRouter)

app.use('/user/reply', replyRouter)
app.use('/user/history', historyRouter)

app.get('/', function (req, res) {
    res.send("Hello")
})

app.listen(PORT, function (req, res) {
    console.log('Server on port ' + PORT)
})