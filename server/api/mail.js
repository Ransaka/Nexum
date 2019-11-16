const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
var request = require('request')
const verify = require('../auth/verify')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer');
const User = require('../models/User')
const complains = require('../models/complain')



router.post('/sendEmail', async function (req, res) {
    console.log(req.body.email)
    let transporter = nodemailer.createTransport({
        //host: 'smtp.gmail.com',
        service: 'Gmail',
        port: 587,
        secure:false,
        //secure: false, // true for 465, false for other ports
        auth: {
            user: 'gamincrunch@gmail.com',
            pass: 'ucsc@123'
        },
        tls: {
            rejectUnauthorized: false //Auth for localhost
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Nexum" <gamincrunch@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'User report!!', // Subject line
        //text: 'Hello world?', // plain text body
        html: `
        <h4>User report warning!!</h4>
        Another user have submit a complain regarding your behaviour.
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

router.patch('/:id',async (req,res)=>{
    try{
        const updatedComplain = await complains.updateOne(
            {_id: req.params.id},
            {$set: {warningSent: true}}
        );
        res.json(updatedComplain);
    }catch(err){
        res.json({message:err});
    }
});


module.exports = router