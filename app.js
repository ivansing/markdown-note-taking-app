const express = require('express')
const app = express()
const cors = require('cors')


const notesRouter = require('./routes/notes')
const grammarRouter = require('./routes/grammar')

const notFoundHandler = require('./middleware/notFoundHandler')
const errorHandler = require('./middleware/errorHandler')

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// Routes
app.use('/notes', notesRouter)
app.use('/grammar', grammarRouter)

// Handle undefined routes
app.use(notFoundHandler)

// Global Error Handling Middleware
app.use(errorHandler)

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sever started on http://localhost:${PORT}`)
})

module.exports = app