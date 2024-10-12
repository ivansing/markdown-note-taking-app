const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notesController')
const multer = require('multer')
const asyncHandler = require('../middleware/asyncHandler')

const upload = multer({ dest: 'uploads/'})

// Routes to controllers CRUD operations
router.get('/',  asyncHandler(notesController.listNotes))
router.post('/', asyncHandler(notesController.createNote))
router.get('/:id', asyncHandler(notesController.getNote))
router.get('/:id/render', asyncHandler(notesController.renderNote))
router.put('/:id', asyncHandler(notesController.updateNote))
router.delete('/:id', asyncHandler(notesController.deleteNote))
router.post('/upload', upload.single('file'), asyncHandler(notesController.uploadNote))

module.exports = router