const { User } = require('../../models')
const { createNewToken } = require('../../utils')

// Notes :Register controller for creare new user
const register = async (req, res) => {
    const { fullName, email, password } = req.body
    if (!fullName || !email || !password) {
        return res.status(400).json({
            error: 'Fields are required'
        })
    }
    try {
        // Notes : The arguments passed to the create() method depend on the req.body property
        const user = await User.create({ fullName, email, password })
        const token = createNewToken(user._id)
        // Notes: Set expiry for token to 1 month 
        // Fix/Bugs : Mungkin lebih cantik jgn pake let tapi const dan kayak disatuin datenya, 
        // contoh, const days = new Date.days.setDate(...), kalo bisa.
        const days = new Date()
        days.setDate(days.getDate() + 30)
        // Notes : Cookie settings 
        res.cookie('jwt', token, {
            expires: days,
            httpOnly: true,
            secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
            sameSite: 'none'
        });
        // Notes: Remove user password from output (response data)
        user.password = undefined;
        res.status(200).json({
            status: 'Create new user is success!',
            token,
            data: {
                user
            }
        });
    } catch (err) {
        res.status(400).json({
            error: {
                message: 'Register is failed',
                details: err.message
            }
        })
    }
}

module.exports = register