import styles from "./PaymentPage.module.css";
import { useOrder } from "../../features/order/useOrder";
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import OrderItems from "../../features/order/OrderItems";
import Map from "../../components/Map/Map";
import PayPalButton from "../../components/PaypalButton/PayPalButton";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const [convertedCurrency, setConvertedCurreny] = useState(0);
  const { order, isLoading } = useOrder();

  // convert currency
  const convertCurrency = async (amount) => {
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=IDR&to=USD`
    );
    const data = await res.json();
    const toUSD = Number((Math.round(data.rates.USD * 100) / 100).toFixed(2));
    // console.log(toUSD);
    setConvertedCurreny(toUSD);
  };

  useEffect(() => {
    convertCurrency(order?.order?.totalPrice);
  }, [order?.order?.totalPrice]);

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
            {convertedCurrency !== 0 && (
              <PayPalButton order={order} amount={convertedCurrency} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
