import Link from 'next/link';
import styles from './UploadButton.module.css';

const UploadButton = () => (
  <Link href="/notes/upload" className={styles.uploadButton}>
    Upload Markdown
  </Link>
);

export default UploadButton;
