import Link from "next/link";
import LogButton from "./LogButton";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Home Page</h1>
      <Link href="/dashboard">Dashboard</Link>
      <LogButton messages={["Login", "Logout"]} />
    </main>
  );
}
