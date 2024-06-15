const bookingSchema = require('./../Models/bookingModel')
const flightSchema = require('./../Models/flightModel')
const userSchema = require('./../Models/userModel')
exports.bookFlight = async(req,res)=>{
    try{
        const user = await userSchema.findById(req.body.UserId)
        if(!user){
            res.status(404).send({
                message:"User not found"
            })
        }
        const flight = await flightSchema.findById(req.body.FlightId).populate()
        if(!flight){
            res.status(404).send({
                message:"Flight not found"
            })
        }else if(parseInt(flight.noofseats)<=0){
            res.status(404).send({
                message:"Seats are not available"
            })
        }
        const isflightAlreadyBooked  = await bookingSchema.find({UserId:req.body.UserId,FlightId:req.body.FlightId})
        if(isflightAlreadyBooked){
            res.status(404).send({
                message:"Flight Already Booked"
            })
        }
        flightSeats = parseInt(flight.noofseats)-1;
        // console.log(typeof(flightSeats))
        flight.noofseats = `${flightSeats}`
        const updateFlight = await flightSchema.findByIdAndUpdate(flight._id,flight,{
            new:true,
            runValidators:true
        })
        const bookedFlight = await bookingSchema.create(req.body)
        res.status(200).json({
            status:'success',
            data:{
                booking:bookedFlight
            }
        })

    }catch(err){
        res.status(404).send({
            status:'Failed',
            message:err.message
        })
    }
}

exports.getUserBookings = async(req,res)=>{
    try{
        console.log(req.params.id)
        const bookings = await bookingSchema.find({UserId:req.params.id});
        console.log(bookings)
        const bookingsArray = [];
        for(let i=0;i<bookings.length;i++){
            const flight = await flightSchema.findById({_id:bookings[i].FlightId})
            if(flight){
                bookingsArray.push(flight)
            }
        }
        res.status(200).send({
            status:"Success",
            UserId:bookings[0].UserId,
            bookings:bookingsArray
        })
    }catch(err){
        console.log(err.message)
        res.status(404).send({
            status:"Failed",
            message:err.message
        })
    }
}

exports.getflightbookings = async(req,res)=>{
    try{
        console.log(req.params.id)
        const bookings = await bookingSchema.find({FlightId:req.params.id});
        console.log(bookings)
        const bookingsArray = [];
        for(let i=0;i<bookings.length;i++){
            const user = await userSchema.findById({_id:bookings[i].UserId})
            if(user){
                bookingsArray.push(user)
            }
        }
        res.status(200).send({
            status:"Success",
            UserId:bookings[0].FlightId,
            bookings:bookingsArray
        })
    }catch(err){
        console.log(err.message)
        res.status(404).send({
            status:"Failed",
            message:err.message
        })
    }
}