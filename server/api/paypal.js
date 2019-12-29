const express = require('express')
const router = express.Router()
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'ActgKaFSDnhzy67WusypR7dqPFwr617TI_jKV8PES94p_3Abt8lOXt53D4m8iNqL8wmE7ilE1i7I9Mtb',
    'client_secret': 'EE74HFNq1C2qb_zTkWj9Cn7SYYXCgm3IGoSK4qRvYIoyPJ33rWjKLBPUCVqkCTgsf3ImCVhwa9TgKOjZ'
});

router.post('/pay', function (req, res) {
    const amount = toString(req.body.amount)
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/user/paypal/success",
            "cancel_url": "http://localhost:3000/user/paypal/cancel"
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
        console.log(payment)
        if (error) {
            throw error;
        } else {
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

router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    var execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "1.00"
            }
        }]
    }

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            //res.send('Success');
            return res.redirect('localhost:4200/userprofile/acceptfinalize');
        }
    });
})

router.get('/cancel', (req, res) => res.send('Cancelled'));

module.exports = router