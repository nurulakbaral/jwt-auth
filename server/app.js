const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const connect = require('./database')
const auth = require('./routes/auth')
const config = require('./config')

// Setup
const app = express()

//  Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../build')))
app.use(cookieParser())
app.use(cors({
    origin: config.secrets.clientUrl,
    credentials: true,
    optionSuccessStatus: 200,
}))

// App routes
// Notes : Be careful with the order of routes because they run sequentially.
app.use('/auth/', auth)

// Server
const runServer = async () => {
    try {
        await connect()
            .then((result) => app.listen(config.port, () => {
                console.log(`Success : Running on PORT ${config.port}`)
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