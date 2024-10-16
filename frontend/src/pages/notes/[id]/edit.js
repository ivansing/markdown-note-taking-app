import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../../components/Navbar';
import axios from 'axios';
import styles from '../../../styles/EditNote.module.css'

const EditNote = ({ note, error }) => {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  const [loading, setLoading] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUpdateError('');
    setUpdateSuccess('');

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notes/${id}`, {
        title,
        content
      });

      if (response.status === 200) {
        setUpdateSuccess('Note updated successfully!');
        // Optionally, redirect back to the note detail page
        setTimeout(() => {
          router.push(`/notes/${id}`);
        }, 1500);
      } else {
        setUpdateError('Failed to update note.');
      }
    } catch (error) {
      console.error('Error updating note:', error);
      setUpdateError(error.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (router.isFallback) {
    return (
      <>
        <Navbar />
        <div className={styles.container}>
          <p>Loading...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className={styles.container}>
          <h1 className={styles.title}>Error</h1>
          <p>{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Edit Note</h1>
        <form onSubmit={handleUpdateNote} className={styles.form}>
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
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Updating...' : 'Update Note'}
          </button>
        </form>
        {updateError && <p className={styles.error}>{updateError}</p>}
        {updateSuccess && <p className={styles.success}>{updateSuccess}</p>}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notes/${id}`);
    const note = response.data;
    return { props: { note } };
  } catch (error) {
    console.error('Error fetching note:', error.message);
    return { props: { note: null, error: error.message } };
  }
}

export default EditNote;
