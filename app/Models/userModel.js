const mongoose = require('mongoose')
const validator = require('validator')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate:[validator.isEmail]
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    password:{
        type:String,
        required:true,
        minlenght:8,
    },

    passwordConfirm:{
        type:String,
        validate:{
            validator:function(el){
                return el===this.password
            }
        }
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password,12)
    this.passwordConfirm = undefined
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User