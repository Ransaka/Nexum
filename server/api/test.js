//require('.env').config();
const express = require('express');
const router = express.Router()
const path = require('path');
const sendMail = require('./mail');
const { log } = console;
const app = express();

const PORT = 8080;


// Data parsing
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());



// email, subject, text
app.post('/', (req, res) => {
    const { subject, email, text } = req.body;
    log('Data: ', req.body);

    sendMail(email, subject, text, function(err, data) {
        if (err) {
            log('ERROR: ', err);
            return res.status(500).json({ message: err.message || 'Internal Error' });
        }
        log('Email sent!!!');
        return res.json({ message: 'Email sent!!!!!' });
    });
});
module.exports = router