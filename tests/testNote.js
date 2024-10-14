// tests/testNote.js

const axios = require('axios');

const hostname = 'localhost';
const port = 3000; // Ensure your server is running on this port
const baseURL = `http://${hostname}:${port}`;

async function createRetrieveAndGetAllNotes() {
    try {
        // Step 1: Create a new note
        console.log('📝 Creating a new note...');
        const createResponse = await axios.post(`${baseURL}/notes`, {
            title: 'Test Note',
            content: 'This is a test note.'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (createResponse.status !== 201) {
            console.error(`❌ Failed to create note. Status Code: ${createResponse.status}`);
            console.error('Response Data:', createResponse.data);
            return;
        }

        const createdNote = createResponse.data.note;
        console.log('✅ Note created successfully:', createdNote);

        const noteId = createdNote.id;
        console.log(`🔑 Captured noteId: ${noteId}`);

        // Step 2: Retrieve the created note
        console.log(`🔍 Retrieving the note with ID: ${noteId}...`);
        const getResponse = await axios.get(`${baseURL}/notes/${noteId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (getResponse.status !== 200) {
            console.error(`❌ Failed to retrieve note. Status Code: ${getResponse.status}`);
            console.error('Response Data:', getResponse.data);
            return;
        }

        const retrievedNote = getResponse.data;
        console.log('✅ Note retrieved successfully:', retrievedNote);

        // Step 3: Get all notes
        console.log('📚 Retrieving all notes...');
        const getAllResponse = await axios.get(`${baseURL}/notes`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (getAllResponse.status !== 200) {
            console.error(`❌ Failed to retrieve all notes. Status Code: ${getAllResponse.status}`);
            console.error('Response Data:', getAllResponse.data);
            return;
        }

        const allNotes = getAllResponse.data;
        console.log('✅ All notes retrieved successfully:', allNotes);

        // Optional: Verify the created note is in the list
        const noteExists = allNotes.some(note => note.id === noteId);
        if (noteExists) {
            console.log('🎉 The created note is present in the list of all notes.');
        } else {
            console.error('⚠️ The created note is NOT present in the list of all notes.');
        }

    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error(`❌ Error: Received status code ${error.response.status}`);
            console.error('Response Data:', error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error('❌ Error: No response received from the server.');
            console.error(error.message);
        } else {
            // Something else happened
            console.error('❌ Error:', error.message);
        }
    }
}

createRetrieveAndGetAllNotes();
