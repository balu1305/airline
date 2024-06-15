const express = require('express')
const morgan = require('morgan')
const app = express()
const usercontroller = require('../Controllers/userController')
const flightcontroller = require('./../Controllers/flightController')

const router = express.Router()

app.use(morgan('dev'))
app.use(express.json())

router.post('/createflight',usercontroller.protect,usercontroller.restrictTo('admin'),flightcontroller.addflight)
router.get('/deleteflight/:id',usercontroller.protect,usercontroller.restrictTo('admin'),flightcontroller.deleteflight)
router.get('/getAllflights',usercontroller.protect,flightcontroller.getflights)
router.post('/getflightsByDate',usercontroller.protect,flightcontroller.getflightsByDate)
router.post('/getflightsByDateAndTime',usercontroller.protect,flightcontroller.getflightsByDateAndTime)
module.exports = router