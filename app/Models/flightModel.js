const mongoose = require('mongoose')

const flightSchema = new mongoose.Schema({
    flightName:{
        type:String,
        require:true
    },
    flightOrigin:{
        type:String,
        required:true
    },
    flightDestination:{
        type:String,
        required:true
    },
    flightFare:{
        type:String,
        required:true
    },
    flightStartDate:{
        type:String,
        required:true
    },
    flightEndDate:{
        type:String,
        required:true,
    },
    flightStartTime:{
        type:String,
        required:true
    },
    flightEndTime:{
        type:String,
        required:true
    },
    noofseats:{
        type:String,
        required:true
    },
    flightStartTimestamp:{
        type:Date,
        required:true
    },
    flightEndTimestamp:{
        type:Date,
        required:true
    }
})

const flight = mongoose.model('Flight',flightSchema)
module.exports = flight