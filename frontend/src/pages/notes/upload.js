import { useState } from 'react';
import Navbar from "@/components/Navbar";
import styles from '../../styles/Upload.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';

const UploadPage = () => {
    const router = useRouter();

    // State for Create Note form
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [createNoteLoading, setCreateNoteLoading] = useState(false);
    const [createNoteError, setCreateNoteError] = useState('');
    const [createNoteSuccess, setCreateNoteSuccess] = useState('');

    // State for Upload Markdown form
    const [file, setFile] = useState(null);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState('');

    // Handle Create Note form submission
    const handleCreateNote = async (e) => {
        e.preventDefault();
        setCreateNoteLoading(true);
        setCreateNoteError('');
        setCreateNoteSuccess('');

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notes`, {
                title,
                content
            });
            console.log('RESPONSE', response)

            if (response.status === 201) {
                setCreateNoteSuccess('Note created successfully!');
                setTitle('');
                setContent('');
                // Redirect to Home Page
                setTimeout(() => {
                    router.push('/');
                }, 1500)
                
            } else {
                setCreateNoteError('Failed to create note.');
            }
        } catch (error) {
            console.error('Error creating note:', error);
            setCreateNoteError(error.response?.data?.message || 'An error occurred.');
        } finally {
            setCreateNoteLoading(false);
        }
    };

    // Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle Upload Markdown form submission
    const handleUploadMarkdown = async (e) => {
        e.preventDefault();
        if (!file) {
            setUploadError('Please select a Markdown file to upload.');
            return;
        }

        setUploadLoading(true);
        setUploadError('');
        setUploadSuccess('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notes/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('RESPONSE', response)

            if (response.status === 201) {
                setUploadSuccess('Markdown file uploaded successfully!');
                setFile(null);
                setTimeout(() => {
                    router.push('/');
                }, 1500)
                
            } else {
                setUploadError('Failed to upload Markdown file.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadError(error.response?.data?.message || 'An error occurred.');
        } finally {
            setUploadLoading(false);
        }
    };

    return (
        <>
            <Navbar /> 
            <div className={styles.container}>
                <h1>Create or Upload a Note</h1>
                
                {/* Create Note Section */}
                <div className={styles.createNote}>
                    <h2>Create a New Note</h2>
                    <form onSubmit={handleCreateNote} className={styles.form}>
                        <input 
                            type="text" 
                            placeholder="Title" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required 
                            className={styles.input}
                        />
                        <textarea 
                            placeholder="Write your markdown content here..." 
                            value={content} 
                            onChange={(e) => setContent(e.target.value)} 
                            required 
                            className={styles.textarea}
                        />
                        <button type="submit" className={styles.button} disabled={createNoteLoading}>
                            {createNoteLoading ? 'Creating...' : 'Create Note'}
                        </button>
                    </form>
                    {createNoteError && <p className={styles.error}>{createNoteError}</p>}
                    {createNoteSuccess && <p className={styles.success}>{createNoteSuccess}</p>}
                </div>
                
                {/* Upload Markdown Section */}
                <div className={styles.uploadMarkdown}>
                    <h2>Upload a Markdown File</h2>
                    <form onSubmit={handleUploadMarkdown} className={styles.form}>
                        <input 
                            type="file" 
                            accept=".md" 
                            onChange={handleFileChange} 
                            required 
                            className={styles.fileInput}
                        />
                        <button type="submit" className={styles.button} disabled={uploadLoading}>
                            {uploadLoading ? 'Uploading...' : 'Upload Markdown'}
                        </button>
                    </form>
                    {uploadError && <p className={styles.error}>{uploadError}</p>}
                    {uploadSuccess && <p className={styles.success}>{uploadSuccess}</p>}
                </div>
            </div>
        </>
    )
}

export default UploadPage;
