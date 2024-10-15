const AppError = require('../models/AppError')

const errorHandler = (err, req, res, next) => {
    // Set default values
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    // In development, send full error
    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
            error: err,
        })
    } else {
        //  In production, send minimal error details
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            })
        } else {
            // Programming or other unknow error
            console.error('ERROR 💥:', err);
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong!'
            })
        }
    }   
}

module.exports = errorHandler