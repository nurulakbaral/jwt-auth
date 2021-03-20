const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const dotenv = require('dotenv')
const cors = require('cors')
const { connect } = require('./config/database')

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
// Notes : Urutan peletakan routes harus diperhatikan, karena berjalan secara sekuensial
app.get('/api/post', (req, res) => {
    res.json({
        greetings: 'I am handsome! :)'
    })
})

// Server
const runServer = async () => {
    try {
        await connect()
            .then((result) => app.listen(process.env.PORT, () => {
                console.log(`Success : Running on PORT ${process.env.PORT}`)
            }))
            .catch((err) => { console.log(err) })
    } catch (err) {
        console.log('runServer error', err)
    }
}

module.exports = { runServer }