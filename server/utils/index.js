const createNewToken = require('./createNewToken')

// Fix/Bugs : Setiap fungsi utilitas WAJIB melempar sebuah Error agar dengan cara throw New Error agar bisa ditangkap oleh
// fungsi catchnya di backend serta wajib ditest.
module.exports = { createNewToken }