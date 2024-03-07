import { Link } from "react-router-dom";
import styles from "./CartPage.module.css";
import CartLayout from "../../features/cart/CartLayout";

export default function CartPage() {
  return (
    <div>
      <Link to={"/"} className={styles.back_button}>
        &larr; back to menu
      </Link>
      <CartLayout />
    </div>
  );
}
