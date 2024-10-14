const fs = require('fs').promises
const path = require('path')
const Note = require('../models/noteModel')
const AppError = require('../models/AppError')
const { marked } = require('marked')
// const {enqueueWrite} = require('../middleware/writeQueue')

// Define the path to the notes file
const notesFile = path.join(__dirname, '..', process.env.NOTES_FILE_PATH || 'notes.json')
let notes = []

async function loadNotes() {
    try {
        const data = await fs.readFile(notesFile, 'utf-8')
        notes = data.trim().length ? JSON.parse(data) : []
        console.log('Notes loaded from file.')
    } catch (error) {
        if (error.code === 'ENOENT') {
            notes = []
            console.log('notes.json not found. Staring with an empty array')
        } else {
            console.error('Error parsing notes from file:', error)
            notes = []
        }
    }
}

loadNotes()

// Helper function to save notes to file
async function saveNotesToFile() {
    try {
        await fs.writeFile(notesFile, JSON.stringify(notes, null, 2))
    } catch (error) {
        console.error('Error writing notes to file:', error)
    }

}

// List all notes
exports.listNotes = async (req, res, next) => {
    try {
        res.json(notes)
    } catch (error) {
        next(error)
    }
}

// Create a new note
exports.createNote = async (req, res, next) => {
    try {
        const { title, content } = req.body
        if (!title || !content) {
            return next(new AppError('Title and content are required', 400))
        }
        const note = new Note(Date.now(), title, content)
        notes.push(note)
        await saveNotesToFile()
        res.status(201).json({ message: 'Note saved', note })
    } catch (error) {
        next(error)
    }
}

// Get a single note
exports.getNote = async (req, res, next) => {
    try {
        const noteId = Number(req.params.id)
        const note = notes.find(n => n.id === noteId)
        if (!note) {
            return next(new AppError('Note not found', 404))
        }
        res.json(note)
    } catch (error) {
        next(error)
    }
}

// Render note as HTML
exports.renderNote = async (req, res, next) => {
    try {
        const noteId = Number(req.params.id)
        const note = notes.find(n => n.id === noteId)
        if (!note) {
            return next(new AppError('Note not found', 404))
        }
        const htmlContent = marked(note.content)
        res.send(htmlContent)
    } catch (error) {
        next(error)
    }
}

// Update a note
exports.updateNote = async (req, res, next) => {
    try {
        const noteId = Number(req.params.id)
        const { title, content } = req.body
        if (!title || !content) {
            return next(new AppError('Title and content are required', 400))
        }
        const noteIndex = notes.findIndex(n => n.id === noteId)

        if (noteIndex !== -1) {
            notes[noteIndex] = { ...notes[noteIndex], title, content }
            await saveNotesToFile()
            res.json({ message: 'Note updated', note: notes[noteIndex] })
        } else {
            return next(new AppError('Note not found', 404))
        }
    } catch (error) {
        next(error)
    }
}

// Delete a note
exports.deleteNote = async (req, res, next) => {
    try {
        const noteId = Number(req.params.id)
        const noteIndex = notes.findIndex(n => n.id === noteId)

        if (noteIndex !== -1) {
            const deletedNote = notes.splice(noteIndex, 1)
            await saveNotesToFile()
            res.json({ message: 'Note deleted', note: deletedNote[0] })
        } else {
            return next(new AppError('Note not found', 404))
        }
    } catch (error) {
        next(error)
    }
}

// Upload a Markdown file
exports.uploadNote = async (req, res, next) => {
    try {
        const file = req.file
        if (!file) {
            return next(new AppError('No file uploaded', 400))
        }
        const data = await fs.readFile(file.path, 'utf-8')
        const note = new Note(Date.now(), file.originalname, data)
        notes.push(note)
        await saveNotesToFile()

        // Delete the uplaoded file to clean up
        try {
            await fs.unlink(file.path)
        } catch (error) {
            console.error('Error deleting file:', error)
        }

        res.status(201).json({
            status: 'success',
            message: 'File upload and note save',
            data: { note },
        })
    } catch (error) {
        return next(new AppError('Error processing file', 500))
    }
}