import { Link } from "react-router-dom";
import DateTime from "../../components/DateTime/DateTime";
import Map from "../../components/Map/Map";
import NotFound from "../../components/NotFound/NotFound";
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import OrderItems from "../../features/order/OrderItems";
import { useOrdered } from "../../features/order/useOrdered";
import styles from "./OrderTrackPage.module.css";

export default function OrderTrackPage() {
  const { ordered, isLoading } = useOrdered();

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      {!ordered && <NotFound />}
      {ordered && (
        <div className={styles.container}>
          <div className={styles.content}>
            <h1>Order # {ordered.id}</h1>
            <div className={styles.header}>
              <div>
                <p>Date :</p>
                <span>
                  <DateTime date={ordered.createdAt} />
                </span>
              </div>
              <div>
                <p>Name :</p>
                <span>{ordered.name}</span>
              </div>
              <div>
                <p>Status :</p>
                <span>{ordered.status}</span>
              </div>
              {ordered.paymentId && (
                <div>
                  <p>Payment ID :</p>
                  <span>{ordered.paymentId}</span>
                </div>
              )}
            </div>

            <OrderItems orders={ordered} />
          </div>

          <div className={styles.map_container}>
            <h1>Your Location</h1>
            <Map location={ordered.addressLatLng} readonly={true} />
          </div>

          {ordered.status === "new" && (
            <div className={styles.payment}>
              <Link to={"/payment"}>Go to payment</Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}
