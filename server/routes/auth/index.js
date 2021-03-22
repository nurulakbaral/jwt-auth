const { Router } = require('express')
const { registerController, loginController } = require('../../controllers/auth')

// Setup
const router = Router()

// Routes
router.post('/register', registerController)
router.post('/login', loginController)

module.exports = router