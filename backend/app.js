require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')


const notesRouter = require('./routes/notes')
const grammarRouter = require('./routes/grammar')

const notFoundHandler = require('./middleware/notFoundHandler')
const errorHandler = require('./middleware/errorHandler')

const app = express()

// Load Swagger document
const swaggerDocument = YAML.load(path.join(__dirname, 'docs', 'swagger.yaml'))


// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Routes
app.use('/notes', notesRouter)
app.use('/grammar', grammarRouter)

// Handle undefined routes
app.use(notFoundHandler)

// Global Error Handling Middleware
app.use(errorHandler)

// Start the Server
if (require.main === module) {
    const PORT = process.env.PORT || 5000
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Sever started on http://localhost:${PORT}`)
    })
}


module.exports = app