const express = require('express')
const router = express.Router()
const grammarController = require('../controllers/grammarController')

router.post('/grammar-check', grammarController.checkGrammar)

module.exports = router