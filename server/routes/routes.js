const express = require('express')
const router = express.Router()
const render = require('../render')
const controller = require('./../../controller/controller')


router.get('/', render.home_page)
router.post('/api/register', controller.register)

module.exports = router