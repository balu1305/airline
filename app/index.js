const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const userRouter = require('./Routers/userRouter')
const flightRouter  = require('./Routers/flightRouter')
const bookingRouter  = require('./Routers/bookingRouter')
const cors = require("cors");

const dotenv  = require('dotenv')

const app = express()
app.set('trust proxy', true)
app.use(cors());

dotenv.config({path:'./config.env'})

const DB = process.env.DATABASE.replace('<password>',process.env.PASSWORD)

const connectionParam = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}
mongoose.connect(DB,connectionParam).then(con=>{
    console.log('DB CONNECTION SUCCESS')
}).catch(err=>{
    console.log(err)
})

const PORT = process.env.PORT||3000

app.use(morgan('dev'))
app.use(express.json())
app.listen(PORT,()=>{
    console.log("Listening on Port 3000")
})

app.use('/api/user',userRouter)
app.use('/api/flight',flightRouter)
app.use('/api/book',bookingRouter)

