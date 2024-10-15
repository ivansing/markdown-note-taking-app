const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const path = require('path')

function runTests() {
    describe('📚 Notes API Endpoints', () => {
        let noteId;
        let testsPassed = 0
        let testsFailed = 0

        // Hook to track test results
        afterEach(function() {
            if (this.currentTest.state === 'passed') {
                testsPassed++
            } else if (this.currentTest.state === 'failed') {
                testsFailed++
            }
        })

        // After all tests, log the summary
        after(function() {
            const totalTests = testsPassed + testsFailed
            console.log('\n🔍 Test Summary');
            console.log(`✅ Passed: ${testsPassed} / ${totalTests}`);
            console.log(`❌ Failed: ${testsFailed} / ${totalTests}`);
            if (testsFailed > 0) {
                console.log('🚫 Some tests failed.');
            } else {
                console.log('🎉 All tests passed successfully!');
            }
        })
    
        it('✔ should create a new note', (done) => {
            request(app)
                .post('/notes')
                .send({ title: 'Test Note Mocha', content: 'This is a mocha chai test note.' })
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('note');
                    expect(res.body.note).to.include({ title: 'Test Note Mocha', content: 'This is a mocha chai test note.' });
                    noteId = res.body.note.id;
                    done();
                });
        });
    
        it('✔ should retrieve a single note', (done) => {
            request(app)
                .get(`/notes/${noteId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.include({ id: noteId, title: 'Test Note Mocha', content: 'This is a mocha chai test note.' });
                    done();
                });
        });
    
        it('✔ should retrieve all notes', (done) => {
            request(app)
                .get('/notes')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res.body).to.be.an('array')
                    // Check that the created note is in the list
                    const createdNote = res.body.find(note => note.id === noteId)
                    expect(createdNote).to.include({ id: noteId, title: 'Test Note Mocha', content: 'This is a mocha chai test note.' })
                    done()
                })
        })
    
        it('✔ should update the created note', (done) => {
            request(app)
                .put(`/notes/${noteId}`)
                .send({ title: 'Updated Test Note Mocha', content: 'This note has been updated via Mocha.' })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('note');
                    expect(res.body.note).to.include({ id: noteId, title: 'Updated Test Note Mocha', content: 'This note has been updated via Mocha.' });
                    done();
                });
        });
    
        it('✔ should delete the created note', (done) => {
            request(app)
                .delete(`/notes/${noteId}`)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('note');
                    expect(res.body.note).to.include({ id: noteId, title: 'Updated Test Note Mocha', content: 'This note has been updated via Mocha.' });
                    done();
                });
        });
    
        it('✔ should upload a markdown file and create a new note', (done) => {
            const filePath = path.join(__dirname, 'sample.md'); // Ensure 'sample.md' exists in the 'tests' directory
        
            request(app)
                .post('/notes/upload')
                .attach('file', filePath)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                                  
                    // Adjust the expectations based on the actual response structure
                    if (res.body.note) {
                        
                        // If 'note' is a direct property
                        expect(res.body).to.have.property('note');
                        expect(res.body.note).to.have.property('title');
                        expect(res.body.note).to.have.property('content');
                        const uploadedNoteId = res.body.note.id;
                        expect(uploadedNoteId).to.be.a('number');
                    } else if (res.body.data && res.body.data.note) {
                        
                        // If 'note' is nested inside 'data'
                        expect(res.body.data).to.have.property('note');
                        expect(res.body.data.note).to.have.property('title');
                        expect(res.body.data.note).to.have.property('content');
                        const uploadedNoteId = res.body.data.note.id;
                        expect(uploadedNoteId).to.be.a('number');
                    } else {
                        
                        // If 'note' is nested differently or missing
                        throw new Error('Response does not contain a note property');
                    }
                    done();
                });
        });
        
    });

   
}

runTests()