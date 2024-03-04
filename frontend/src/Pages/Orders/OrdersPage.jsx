import Orders from "../../features/order/Orders";
import OrdersUserOperation from "../../features/order/OrdersUserOperation";
import styles from "./OrdersPage.module.css";

export default function OrdersPage() {
  return (
    <div className={styles.container}>
      <OrdersUserOperation />
      <Orders />
    </div>
  );
}
