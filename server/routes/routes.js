const express = require('express')
const router = express.Router()
const render = require('../render')
const multer  = require ('multer')
const controller = require('./../../controller/controller')

//set routes
router.get('/', render.home_page)
router.post('/api/register', controller.register)
router.get('/login', render.login_page)
router.post('/api/login', controller.login)
// router.post('/api/login', controller.login)


module.exports = router

