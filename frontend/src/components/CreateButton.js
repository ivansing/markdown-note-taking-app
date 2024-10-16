import Link from 'next/link';
import styles from './CreateButton.module.css';

const CreateButton = () => (
  <Link href="/notes/upload" className={styles.createButton}>
    Create Note
  </Link>
);

export default CreateButton;
