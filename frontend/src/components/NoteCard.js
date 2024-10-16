import Link from 'next/link';
import styles from './NoteCard.module.css';

const NoteCard = ({ note }) => {
  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this note?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notes/${note.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Note deleted successfully.');
        // Optionally, refresh the notes list or remove the deleted note from state
        window.location.reload();
      } else {
        alert('Failed to delete the note.');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('An error occurred while deleting the note.');
    }
  };

  return (
    <div className={styles.card}>
      <h3>{note.title}</h3>
      <p>{new Date(note.createdAt).toLocaleDateString()}</p>
      <div className={styles.actions}>
        <Link href={`/notes/${note.id}`} className={styles.viewButton}>
          View
        </Link>
        <Link href={`/notes/${note.id}/edit`} className={styles.editButton}>
          Edit
        </Link>
        <button onClick={handleDelete} className={styles.deleteButton}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
