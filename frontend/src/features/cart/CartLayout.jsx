import NotFound from "../../components/NotFound/NotFound";
import Rupiah from "../../helper/formatCurrency";
import CartItem from "./CartItem";
import styles from "./CartLayout.module.css";
import { useSelector } from "react-redux";
import { getCarts, getTotalPrice } from "./cartSlice";

export default function CartLayout() {
  const carts = useSelector(getCarts);
  const totalPrice = useSelector(getTotalPrice);

  return (
    <div>
      <p className={styles.cart_title}>Your cart, Aerith</p>
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
            <button className={styles.checkout_btn}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
