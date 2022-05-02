const express = require('express')
const router = express.Router()
const render = require('../render')


router.get('/', render.home_page)

module.exports = router