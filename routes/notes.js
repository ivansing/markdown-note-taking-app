const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notesController')
const multer = require('multer')
const asyncHandler = require('../middleware/asyncHandler')
const { body} = require('express-validator')
const validationMiddleware = require('../middleware/validationMiddleware')

const upload = multer({ dest: 'uploads/'})

// Routes to controllers CRUD operations

// List all notes
router.get('/',  asyncHandler(notesController.listNotes))

// Create a new note with validation
router.post(
    '/',
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('content').notEmpty().withMessage('Content is required')
    ],
    validationMiddleware,
    asyncHandler(notesController.createNote)
)

// Get a single note
router.get('/:id', asyncHandler(notesController.getNote))

// Render a note as HTML
router.get('/:id/render', asyncHandler(notesController.renderNote))

// Update a note with validation
router.put(
    '/:id',
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('content').notEmpty().withMessage('Content is required')
    ],
    validationMiddleware,
    asyncHandler(notesController.updateNote)
)

// Delete a note
router.delete('/:id', asyncHandler(notesController.deleteNote))

// Upload a Markdown file
router.post('/upload', upload.single('file'), asyncHandler(notesController.uploadNote))

module.exports = router