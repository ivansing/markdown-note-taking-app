const AppError = require('../models/AppError')

const notFoundHandler = (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404))
}

module.exports = notFoundHandler