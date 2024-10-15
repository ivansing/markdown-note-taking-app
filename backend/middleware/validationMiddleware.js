const {validationResult} = require('express-validator')
const AppError = require('../models/AppError')

const validationMiddleware = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const messages = errors.array().map(err => err.msg)
        return next(new AppError(messages.join('. '), 400))
    }
    next()
}

module.exports = validationMiddleware