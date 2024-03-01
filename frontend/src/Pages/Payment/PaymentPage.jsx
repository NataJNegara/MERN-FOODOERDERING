import styles from "./PaymentPage.module.css";
import { useOrder } from "../../features/order/useOrder";
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import OrderItems from "../../features/order/OrderItems";
import Map from "../../components/Map/Map";
import PayPalButton from "../../components/PaypalButton/PayPalButton";

export default function PaymentPage() {
  //   const [order, setOrder] = useState();

  const { order, isLoading } = useOrder();

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Payment</h1>

          <div className={styles.summary}>
            <div>
              <p>Name:</p>
              <span>{order.order.name}</span>
            </div>
            <div>
              <p>Address:</p>
              <span>{order.order.address}</span>
            </div>
          </div>

          <OrderItems orders={order.order} />
        </div>

        <div className={styles.map}>
          <h1>Your location</h1>
          <Map readonly={true} location={order.order.addressLatLng} />
        </div>

        <div className={styles.buttons_container}>
          <div className={styles.buttons}>
            <PayPalButton order={order} />
          </div>
        </div>
      </div>
    </>
  );
}
