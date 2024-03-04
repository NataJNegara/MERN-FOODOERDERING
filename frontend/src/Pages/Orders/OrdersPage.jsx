import Orders from "../../features/order/Orders";
import OrdersUserOperation from "../../features/order/OrdersUserOperation";
import styles from "./OrdersPage.module.css";

export default function OrdersPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Orders Page</h1>
      <OrdersUserOperation />
      <Orders />
    </div>
  );
}
