const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Verify = require('../auth/verify')


/**
 * Broadcast endpoint.
 *
 * Verify given user credentials and provide JWT token.
 *
 * @body User credentials (username and password)
 * @response JWT token
 */
router.post('/broadcast', (req, res, next) => {})



module.exports = router