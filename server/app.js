const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const dotenv = require('dotenv')
const cors = require('cors')
const { connect } = require('./config/database')
const auth = require('./routes/auth/index')

// Setup
dotenv.config()
const app = express()

//  Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../build')))
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionSuccessStatus: 200,
}))

// App routes
// Notes : Be careful with the order of routes because they run sequentially.
app.get('/api/post', (req, res) => {
    res.json({
        greetings: 'I am handsome! :)'
    })
})
app.use('/auth/', auth)

// Server
const runServer = async () => {
    try {
        await connect()
            .then((result) => app.listen(process.env.PORT, () => {
                console.log(`Success : Running on PORT ${process.env.PORT}`)
            }))
            .catch((err) => {
                throw new Error(err)
            })
    } catch (err) {
        // Notes : Always set message property for the error
        console.log('runServer error', err.message)
    }
}

module.exports = { runServer }