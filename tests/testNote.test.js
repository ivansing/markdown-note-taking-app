const request = require('supertest');
const { expect } = require('chai');
const app = require('../app'); // Ensure app.js exports the Express app

describe('Notes API Endpoints', () => {
    let noteId;

    it('should create a new note', (done) => {
        request(app)
            .post('/notes')
            .send({ title: 'Test Note Mocha', content: 'This is a manual test note.' })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('note');
                expect(res.body.note).to.include({ title: 'Test Note Mocha', content: 'This is a manual test note.' });
                noteId = res.body.note.id;
                done();
            });
    });

    it('should retrieve a single note', (done) => {
        request(app)
            .get(`/notes/${noteId}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.include({ id: noteId, title: 'Test Note Mocha', content: 'This is a manual test note.' });
                done();
            });
    });
});
