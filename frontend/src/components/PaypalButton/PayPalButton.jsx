import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { pay } from "../../services/apiOrder";
import { clearCart } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import store from "../../store";

const initialOptions = {
  clientId:
    "ATAKrOKA1LP4X9fCVUPaQYv9digW7lrPHEI3_-toJRBPpa5GU3nBQJfDtTSdEQTviRPjRU7g6doc9As_",
  currency: "USD",
  intent: "capture",
};

export default function PayPalButton({ order, amount }) {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <Buttons order={order} amount={amount} />
    </PayPalScriptProvider>
  );
}

function Buttons({ order, amount }) {
  const navigate = useNavigate();

  // console.log(Number(amount));

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: Number(amount),
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const payment = await actions.order.capture();
      const orderId = await pay(payment.id);
      store.dispatch(clearCart());
      toast.success("Payment success");
      navigate("/track/" + orderId);
    } catch (error) {
      toast.error("Payment failed");
    }
  };

  const onError = (err) => {
    console.log(err.message);
    toast.error("Oops something wrong, try again later", "Error");
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onError}
    />
  );
}
