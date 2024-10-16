import NoteCard from './NoteCard';
import styles from './NoteList.module.css';

const NoteList = ({ notes }) => {
  if (notes.length === 0) {
    return <p>No notes available. Start by creating a new note!</p>;
  }

  return (
    <div className={styles.list}>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NoteList;
