import NotFound from "../../components/NotFound/NotFound";
import Rupiah from "../../helper/formatCurrency";
import CartItem from "./CartItem";
import styles from "./CartLayout.module.css";
import { useSelector } from "react-redux";
import { getCarts, getTotalPrice } from "./cartSlice";
import { Link } from "react-router-dom";
import { useUser } from "../auth/useUser";

export default function CartLayout() {
  const carts = useSelector(getCarts);
  const totalPrice = useSelector(getTotalPrice);
  const { user } = useUser();

  return (
    <div>
      <p className={styles.cart_title}>Your cart, {user.username}</p>
      {carts.length === 0 && <NotFound />}
      {carts.length > 0 && (
        <div className={styles.cart_container}>
          <ul>
            {carts.map((cart) => (
              <CartItem key={cart.id} cart={cart} />
            ))}
          </ul>
          <div className={styles.checkout_container}>
            <p className={styles.checkout_header}>Total:</p>
            <p className={styles.checkout_harga}>{Rupiah.format(totalPrice)}</p>
            <Link to={"/checkout"} className={styles.checkout_btn}>
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
