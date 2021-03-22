const { User } = require('../../models')
const { createNewToken } = require('../../utils')

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        // Fix/Bugs : Jika terjadi error, lebih baik error-nya di passing ke sebuah controller (pusat error) yang khusus meng-handle error
        // maka controller ini dijadikan middleware dan kirim error melalui next() function, contoh, next(err)
        return res.status(400).json({
            error: 'Fields are required'
        })
    }
    try {
        // Notes : The arguments passed to the create() method depend on the req.body property
        await User.login({ email, password })
            .then((user) => {
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
                user.password = undefined
                res.status(200).json({
                    status: 'Login is success!',
                    token,
                    data: {
                        user
                    }
                })
            })
            .catch((err) => {
                throw new Error(err)
            })
    } catch (err) {
        res.status(400).json({
            error: {
                message: 'Email or Password is wrong!',
                details: err.message
            }
        })
    }
}

module.exports = login