import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import styles from "./Orders.module.css";
import Rupiah from "../../helper/formatCurrency";
import { useOrders } from "./userOrders";
import DateTime from "../../components/DateTime/DateTime";
import NotFound from "../../components/NotFound/NotFound";
import { Link } from "react-router-dom";

export default function Orders() {
  const { isLoading, orders } = useOrders();

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      {orders.length === 0 && <NotFound />}
      <div className={styles.container}>
        {orders.map((order) => (
          <div key={order._id} className={styles.order_item}>
            <div className={styles.header}>
              <p className={styles.status}>{order.status}</p>
              <p>{order._id}</p>
              <DateTime date={order.createdAt} />
            </div>
            <div className={styles.image_container}>
              {order.items.map((item, i) => (
                <img key={i} src={item.imageUrl} />
              ))}
            </div>
            <div className={styles.footer}>
              <Link to={`/track/${order.id}`}>Show Order</Link>
              <p className={styles.price}>{Rupiah.format(order.totalPrice)}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
