import Head from 'next/head';
import Navbar from '../components/Navbar';
import CreateButton from '../components/CreateButton';
import UploadButton from '../components/UploadButton';
import NoteList from '../components/NoteList';
import styles from '@/styles/Home.module.css';
import axios from 'axios';

export default function Home({ notes, error }) {
  return (
    <>
      <Head>
        <title>Markdown Note-Taking App</title>
        <meta name="description" content="A powerful Markdown Note-Taking App." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page}`}>
        <main className={styles.main}>
          <Navbar />
          <div className={styles.ctas}>
            <CreateButton />
            <UploadButton />
          </div>
          {error ? (
            <p>Error fetching notes: {error}</p>
          ) : (
            <NoteList notes={notes} />
          )}
        </main>
      </div>
    </>
  );
}

// Fetch notes from the backend using Axios
export async function getServerSideProps() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notes`);
    const notes = response.data; 
    return { props: { notes } };
  } catch (error) {
    console.error('Error fetching notes:', error.message);
    return { props: { notes: [], error: error.message } };
  }
}
