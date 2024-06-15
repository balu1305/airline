const flightSchema = require('./../Models/flightModel')
var moment = require('moment')
function convertToISODateTime(dateString, timeString) {
    // Split the date and time strings
    var dateParts = dateString.split("-");
    var timeParts = timeString.split(":");
  
    // Create a new Date object with the given date and time
    var date = new Date(
      parseInt(dateParts[2]),   // Year
      parseInt(dateParts[1]) - 1, // Month (subtract 1 as months are zero-based in JavaScript)
      parseInt(dateParts[0]),   // Day
      parseInt(timeParts[0]),   // Hours
      parseInt(timeParts[1])    // Minutes
    );
  
    // Generate the ISO date string with time
    var isoDateTimeString = date.toISOString();
  
    // Return the ISO date string with time
    return isoDateTimeString;
  }
exports.addflight = async(req,res)=>{
    try{
        console.log(req.body)
        req.body.flightStartTimestamp = new Date(convertToISODateTime(req.body.flightStartDate,req.body.flightStartTime));
        req.body.flightEndTimestamp = new Date(convertToISODateTime(req.body.flightEndDate,req.body.flightEndTime));
        const flight = await flightSchema.create(req.body)
        res.status(200).send({
            status:"success",
            flight:flight
        })
    }catch(err){
        console.log(err.message)
        res.status(404).send({
            status:"Failed",
            error:err.message
        })
    }
}

exports.deleteflight = async(req,res)=>{
    try{
        console.log("ok:",req.params.id)
        await flightSchema.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message:'Successfully deleted',
            data:null
        }) 
    }catch(err){
        console.log(err.message)
        res.status(404).send({
            status:"Error in deletion of flight",
            error:err.message
        })
    }
}

exports.getflights = async(req,res)=>{
    try{
        const flights = await flightSchema.find()
        res.status(200).send({
            status:"Success",
            flights:flights
        })
    }catch(err){
        res.status(404).send({
            status:"Failed",
            message:err.message
        })
    }
}
exports.getflightsByDate = async(req,res)=>{
    try{
        console.log(req.body.startDate)
        darr = req.body.startDate.split("-");    
        var dobj1 = new Date(parseInt(darr[2]),parseInt(darr[1])-1,parseInt(darr[0]),0,0,0);
        var dobj2 = new Date(parseInt(darr[2]),parseInt(darr[1])-1,parseInt(darr[0]),23,59,59);
        const result = await flightSchema.find({
            "flightOrigin":req.body.flightOrigin,
            "flightDestination":req.body.flightDestination,
            "flightStartTimestamp":{
                $gte:dobj1,
                $lte:dobj2
            }
    })
        if(result){
            console.log(result);
            res.status(200).send({
                Message:"Success",
                result:result
            })
        }
        else{
            res.status(201).send({
                Message:'Error in processing'
            })
        }
    }catch(err){
        res.status(500).send({
            Message:'Internal Server Error'
        })
    }
}
exports.getflightsByDateAndTime = async(req,res)=>{
    try{
        darr = req.body.startDate.split("-");    
        tm = req.body.time.split(":")
        var dobj1 = new Date(parseInt(darr[2]),parseInt(darr[1])-1,parseInt(darr[0]),parseInt(tm[0]),parseInt(tm[1]),0);
        var dobj2 = new Date(parseInt(darr[2]),parseInt(darr[1])-1,parseInt(darr[0]),parseInt(tm[0]),parseInt(tm[1]),59);
        const result = await flightSchema.find({
            "flightOrigin":req.body.flightOrigin,
            "flightDestination":req.body.flightDestination,
            "flightStartTimestamp":{
                $gte:dobj1,
                // $lte:dobj2
            }
    })
        if(result){
            console.log(result);
            res.status(200).send({
                Message:"Success",
                result:result
            })
        }
        else{
            res.status(201).send({
                Message:'Error in processing'
            })
        }
    }catch(err){
        res.status(500).send({
            Message:'Internal Server Error'
        })
    }
}