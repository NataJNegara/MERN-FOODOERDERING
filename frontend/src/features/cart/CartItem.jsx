import { useDispatch } from "react-redux";
import Rupiah from "../../helper/formatCurrency";
import styles from "./CartItem.module.css";
import { decQuantity, deleteItem, incQuantity } from "./cartSlice";

export default function CartItem({ cart }) {
  const dispatch = useDispatch();

  return (
    <li className={styles.item_list}>
      <div className={styles.item}>
        <p>{cart.quantity}&times;</p>
        <img className={styles.image} src={`${cart.imageUrl}`} />
      </div>
      <div className={styles.cart_operation}>
        <p className={styles.name}>{cart.name}</p>
        <p>{Rupiah.format(cart.totalPrice)}</p>
        <div className={styles.update_quantity}>
          <button
            className={styles.button}
            onClick={() => dispatch(decQuantity(cart.id))}>
            -
          </button>
          <span>{cart.quantity}</span>
          <button
            className={styles.button}
            onClick={() => dispatch(incQuantity(cart.id))}>
            +
          </button>
        </div>
        <button
          className={styles.delete_button}
          onClick={() => dispatch(deleteItem(cart.id))}>
          Delete
        </button>
      </div>
    </li>
  );
}
