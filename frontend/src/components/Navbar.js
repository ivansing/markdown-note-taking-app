import Link from "next/link";
import styles from './Navbar.module.css'

const Navbar = () => {
    <nav className={styles.navbar}>
        <div className={styles.log}>
            <Link href="/">Markdown Note-Taking App</Link>
        </div>
        <ul className={styles.navLinks}>
            <li href="/">
                <Link href="/">Home</Link>
            </li>
            <li href="">
                <Link href="/notes/upload">Create Note</Link>
            </li>
            <li href="">
                <Link href="/notes/upload">Upload Markdown</Link>
            </li>
        </ul>
    </nav>
}

export default Navbar