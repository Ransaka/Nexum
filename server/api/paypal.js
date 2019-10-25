const express = require('express')
const router = express.Router()
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'ActgKaFSDnhzy67WusypR7dqPFwr617TI_jKV8PES94p_3Abt8lOXt53D4m8iNqL8wmE7ilE1i7I9Mtb',
    'client_secret': 'EJ29fb3Ydv1noKM7MddkFSk5Y-0y7_MzrKEZsmQpQL-d-vbDO6_Q_1rzMCKd5q5vCEXwQ3ryfiLxV8WM'
});

router.post('/pay', function (req, res) {
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "1.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "1.00"
            },
            "description": "This is the payment description."
        }]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log(payment);
            var url;
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    url = String(payment.links[i].href)
                }
            }
            res.send({
                url: url
            })
        }
    });
})

module.exports = router