import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const user = {
    name: "Aerith",
  };
  const cart = {
    totalCart: 7,
  };

  function handleLogout() {
    console.log("logout");
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to={"/"} className={styles.logo}>
          Food Addict
        </Link>
        <nav>
          <ul>
            {user ? (
              <li className={styles.menuContainer}>
                <Link to={"/profile"}>{user.name}</Link>
                <div className={styles.menu}>
                  <Link to={"/profile"}>Profile</Link>
                  <Link to={"/orders"}>Orders</Link>
                  <button onClick={handleLogout} className={styles.button}>
                    Logout
                  </button>
                </div>
              </li>
            ) : (
              <>
                <Link to={"/signup"}>Signup</Link>
                <Link to={"/login"}>Login</Link>
              </>
            )}
            <li>
              <Link to={"/cart"}>
                Cart{" "}
                {cart.totalCart > 0 && (
                  <span className={styles.cartCount}>{cart.totalCart}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
