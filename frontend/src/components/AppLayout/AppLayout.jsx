import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <section className={styles.section}>
          <Outlet />
        </section>
      </main>
    </>
  );
}
