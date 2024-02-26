import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";
import { getTotalCart } from "../../features/cart/cartSlice";
import { useUser } from "../../features/auth/useUser";
import { useLogout } from "../../features/auth/useLogout";
import { IoCart, IoPerson } from "react-icons/io5";

export default function Header() {
  const { user, isLoading } = useUser();

  const { isLogout, logout } = useLogout();

  const totalCart = useSelector(getTotalCart);

  function handleLogout() {
    logout();
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
                <>
                  {isLoading && <p>...</p>}
                  {!isLoading && (
                    <Link to={"/profile"} className={styles.profile}>
                      <IoPerson />
                    </Link>
                  )}
                </>
                <div className={styles.menu}>
                  <Link to={"/profile"}>Profile</Link>
                  <Link to={"/orders"}>Orders</Link>
                  <button
                    onClick={handleLogout}
                    className={styles.button}
                    disabled={isLogout}>
                    Logout
                  </button>
                </div>
              </li>
            ) : (
              <>
                <Link to={"/login"}>Login</Link>
              </>
            )}
            <li className={styles.cart_container}>
              <Link to={"/cart"} className={styles.cart}>
                <IoCart />
                {totalCart > 0 && (
                  <span className={styles.cartCount}>{totalCart}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
