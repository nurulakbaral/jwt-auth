const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

// Setup
const { Schema } = mongoose
const { isEmail } = validator

// Schema
const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Please enter your full name']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Please enter your email'],
        validate: [isEmail, 'Please enter your valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password']
    }
})

// Hook methods
// Notes : Invoke a function before data saved to database
userSchema.pre('save', async function (next) {
    // Notes :  This condition may not change the password hash when Model.prototype.save() in mongoose invoked
    if (this.password && this.isModified('password')) {
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

// Static methods
userSchema.statics.login = async function (user) {
    const { email, password } = user
    const isUserExist = await this.findOne({ email })
    const isPasswordValid = await bcrypt.compare(password, isUserExist.password)
    if (isUserExist && isPasswordValid) {
        return isUserExist
    }
}
// Notes : Create the instance
const User = mongoose.model('User', userSchema)

module.exports = User