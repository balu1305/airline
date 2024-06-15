const express = require('express')
const morgan = require('morgan')
const app = express()
const usercontroller = require('../Controllers/userController')
const bookingcontroller = require('./../Controllers/bookingController')
const router = express.Router()

app.use(morgan('dev'))
app.use(express.json())

router.post('/bookfli5ght',usercontroller.protect,bookingcontroller.bookFlight)
router.get('/getbookings/:id',usercontroller.protect,bookingcontroller.getUserBookings)
router.get('/getflightbookings/:id',usercontroller.protect,bookingcontroller.getflightbookings)
module.exports = router