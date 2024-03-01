import { Link } from "react-router-dom";
import styles from "./OrderItems.module.css";
import Rupiah from "../../helper/formatCurrency";
import { useSelector } from "react-redux";
import { getTotalPrice } from "../cart/cartSlice";

export default function OrderItems({ orders }) {
  const totalPrice = useSelector(getTotalPrice);

  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <td colSpan="5">
            <h3>Order items :</h3>
          </td>
        </tr>
        {orders.items.map((order) => (
          <tr key={order.id}>
            <td>
              <Link to={`/food/${order.id}`}>
                <img src={order.imageUrl} />
              </Link>
            </td>
            <td>{order.name}</td>
            <td>{Rupiah.format(order.price)}</td>
            <td>{order.quantity}&times;</td>
            <td>{Rupiah.format(order.totalPrice)}</td>
          </tr>
        ))}
        <tr>
          <td colSpan="3"></td>
          <td>
            <strong>Total:</strong>
          </td>
          <td>
            {orders.totalPrice
              ? Rupiah.format(orders.totalPrice)
              : Rupiah.format(totalPrice)}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
