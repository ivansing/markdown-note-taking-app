class Note {
    constructor(id, title, content, createdAt) {
        this.id = id
        this.title = title
        this.content = content 
        this.createdAt = new Date().toISOString()
    }
}

module.exports = Note