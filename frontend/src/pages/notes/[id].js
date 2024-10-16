import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import styles from '../../styles/NoteDetail.module.css';

const NoteDetail = ({ note, error }) => {
  const router = useRouter();
  const { id } = router.query;

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
        <h1 className={styles.title}>{note.title}</h1>
        <p className={styles.date}>{new Date(note.createdAt).toLocaleDateString()}</p>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: note.htmlContent }}
        ></div>
        {/* Add Edit and Delete buttons if desired */}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notes/${id}/html`);
    const note = response.data;
    return { props: { note } };
  } catch (error) {
    console.error('Error fetching note:', error.message);
    return { props: { note: null, error: error.message } };
  }
}

export default NoteDetail;
