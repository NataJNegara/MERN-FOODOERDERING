import CostumerInfo from "../../features/order/CostumerInfo";
import styles from "./CheckoutPage.module.css";

export default function CheckoutPage() {
  return (
    <div>
      <h1 className={styles.page_title}>Checkout Form</h1>
      <CostumerInfo />
    </div>
  );
}
