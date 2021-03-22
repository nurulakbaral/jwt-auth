const { Router } = require('express')
const { registerController } = require('../../controllers/auth/index')

// Setup
const router = Router()

// Routes
router.post('/register', registerController)
router.post('/login', (req, res) => {
    res.status(200).json({
        message: 'Login belum dibuat guys'
    })
})

module.exports = router