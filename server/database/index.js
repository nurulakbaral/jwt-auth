const mongoose = require('mongoose')
const config = require('../config')

// Setup
// Database config
const connect = (dbUrl = config.secrets.dbUrl, options = {}) => {
    return mongoose
        .connect(dbUrl, {
            ...options,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

}

module.exports = connect