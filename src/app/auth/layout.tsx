import { ReactNode } from "react";
import Link from "next/link";
import { ComeBackArrow } from "@/svg";
import styles from "./layout.module.css";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <main className={styles.main}>
      <div className={styles.homeButtonContainer}>
        <Link className={styles.homeButton} href="/">
          <ComeBackArrow /> Home
        </Link>
      </div>
      <div className={styles.authCardContainer}>{children}</div>
    </main>
  );
}
