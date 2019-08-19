var request = require('request');
const express = require('express');
const router = express.Router();


function getTags(textMessage) {
    var options = {
        port: '3000',
        method: 'POST',
        url: 'https://api.textrazor.com/',
        headers: {
            'x-textrazor-key': '51283272e5ba478c5f9e10da3b2695082f057f88f06928e825e0d94f'
        },
        form: {
            extractors: 'entities',
            text: textMessage
        }
    };

    var res = request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body)
    });
}


module.exports = router;