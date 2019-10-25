const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
var request = require('request')
const verify = require('../auth/verify')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer');
const User = require('../models/User')



router.post('/sendEmail', async function (req, res) {
    console.log(req.body.email)
    let transporter = nodemailer.createTransport({
        //host: 'smtp.gmail.com',
        service: 'Gmail',
        //port: 587,
        //secure: false, // true for 465, false for other ports
        auth: {
            user: 'squadupASCNM@gmail.com',
            pass: 'squadupASCNM@123'
        },
        tls: {
            rejectUnauthorized: false //Auth for localhost
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Nexum" <squadupASCNM@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Forgot Password', // Subject line
        //text: 'Hello world?', // plain text body
        html: `
        <h4>Forgot Account Password?</h4>
        Hi, we received a request to reset your Nexum password.If you did not request a password reset, ignore this email and take no further action.
        If you 've forgotten your Nexum password please change your password using <b>http://localhost:4200/userprofile/edit</b>
        <br>
        <h2>Nexum</h2>
        `
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.status(200).send("Mail sent")
})



/**
 * check the availability of the email
 *
 * 
 *
 * @role User
 * @response User of the authenicated user
 */
router.post('/isavailable', function (req, res) {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            return res.status(500).send({
                message: 'Error retrieving User with email: ' + req.body.email
            })
        }
        if (user) {
            user.password = undefined
            var details = {
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname
            }
            res.status(200).send(details)
        } else {
            res.status(200).send(null)
        }

    })
})


module.exports = router