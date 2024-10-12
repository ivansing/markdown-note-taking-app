const fs = require('fs').promises
const path = require('path')
const Note = require('../models/noteModel')
const AppError = require('../models/AppError')
const { marked } = require('marked')
const { nextTick } = require('process')

// Define the path to the notes file
const notesFile = path.join(__dirname, '..', 'notes.json')
let notes = []

async function loadNotes() {
    try {
        const data = await fs.readFile(notesFile, 'utf-8')
        notes = data.trim().length ? JSON.parse(data) : []
        console.log('Notes loaded from file.')
    } catch (error) {
        if (error.code === 'ENOENT') {
            notes = []
            console.log('notes.json not found. Staring with an empy array')
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
        saveNotesToFile()
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
            saveNotesToFile()
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
            saveNotesToFile()
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
            return next(AppError('No file uploaded', 400))
        }

        fs.readFile(file.path, 'utf-8', (err, data) => {
            if (err) {
                return next(new AppError('Error reading file', 500))
            }

            const note = new Note(Date.now(), file.originalname, data)
            notes.push(note)
            saveNotesToFile()

            // Delete the uploaded file to clean up
            fs.unlink(file.path, (err) => {
                if (err) console.error('Error deleting file:', err)
            })

            res.json({ message: 'File uploaded and note saved', note })
        })
    } catch (error) {
        next(error)
    }
}