const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    UserId:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    FlightId:{
        type:mongoose.Schema.ObjectId,
        ref:'Flight'
    }
})

const booking = mongoose.model('Booking',bookingSchema)
module.exports = booking