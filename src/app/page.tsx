import Link from "next/link";
import LogoutButton from "./LogoutButton";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Hom Page</h1>
      <Link href="/dashboard">Dashboard</Link>
      <LogoutButton>Logout</LogoutButton>
    </main>
  );
}
