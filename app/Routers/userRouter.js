const express = require('express')
const morgan = require('morgan')
const app = express()
const usercontroller = require('../Controllers/userController')

const router = express.Router()

app.use(morgan('dev'))
app.use(express.json())

router.post('/signUp',usercontroller.signUp)
router.post('/login',usercontroller.login)
module.exports = router