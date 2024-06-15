const User = require('../Models/userModel')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')


exports.signUp = async(req,res)=>{
    try{
        req.body.role = "user"
    const newUser = await User.create(req.body)
    const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
    res.status(201).json({
        message:"Success",
        token:token,
        body:newUser
    })
    }catch(err){
        console.log(err.message)
        res.status(404).json({
            message:"Error in SignUp of user",
            body:err
        })
    }   
}

exports.login = async(req,res)=>{
    try{
        const email = req.body.email
        console.log(req.body)
        const pass = req.body.password
        console.log(pass)
    if(!email ||!pass){
        return res.status(400).json({
            message:"Please send username ans password to the api"
        })
    }

    const user = await User.findOne({email})
    console.log(user)
    const isValidPass = await bcrypt.compare(pass,user.password)

    if(isValidPass){
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRES_IN
        })
        res.status(200).json({
            message:"Login Success",
            token:token,
            role:user.role,
            userId:user._id
        })
    }else{
        return res.status(401).json({
            message:"Incorrect Email or password"
        })
    }
    }catch(err){
        console.log(err.message)
        res.status(404).json({
            message:err.message
        })
    }
}

exports.protect = async(req,res,next)=>{
    try{
        let token
        if(req.headers.authorization){
            // getting the token
            token =  req.headers.authorization
            console.log(typeof(token))
            console.log(token)
            // verifying the token
            const decoded = await jwt.verify(token,process.env.JWT_SECRET)
            console.log(decoded)
            // checking user exists
            const user = await User.findById(decoded.id)
            if(!user){
                return res.status(404).json({
                    "message":"User no longer exists"
                })
            }
            req.user  = user
        }
        if(!token){
            return (res.status(404).json({
                "message":"You are not logged in"
            })
            )
        }
    }
    catch(err){
        console.log(`okok :${err}`)
        return res.status(404).json({
            "message":err
        })
    }
    next();
}

exports.restrictTo = (...roles)=>{
    return (req,res,next)=>{
        try{
            if(!roles.includes(req.user.role)){
                console.log("no permission to access this route")
                return res.status(404).json({
                    "message":"You Dont have permission to access this route"
                })
            }
        }catch(err){
            console.log(err.message)
            return res.status(404).json({
                "message":err
            })
        }
        next();
    }
}