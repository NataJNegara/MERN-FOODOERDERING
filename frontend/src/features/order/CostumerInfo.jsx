import { useSelector } from "react-redux";
import { useUser } from "../auth/useUser";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getCarts, getTotalPrice } from "../cart/cartSlice";
import FormRow from "../../components/FormRow/FormRow";
import styles from "./CostumerInfo.module.css";
import OrderItems from "./OrderItems";
import Map from "../../components/Map/Map";
import { useCreateOrder } from "./useCreateOrder";

export default function CostumerInfo() {
  const carts = useSelector(getCarts);
  const { user } = useUser();
  const [orders, setOrders] = useState({ items: carts });

  const { createOrder } = useCreateOrder();
  const totalPrice = useSelector(getTotalPrice);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    if (!orders.addressLatLng) {
      toast.warning(
        "Please select your location so we can delivery your order"
      );
      return;
    }

    // todo
    // console.log({
    //   ...orders,
    //   name: data.name,
    //   address: data.address,
    //   totalPrice,
    // });
    createOrder({
      ...orders,
      name: data.name,
      address: data.address,
      totalPrice,
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <div className={styles.content}>
          <FormRow label="Name" error={errors?.name?.message}>
            <input
              className={styles.input}
              type="text"
              id="name"
              {...register("name", { required: "This field is requried" })}
            />
          </FormRow>
          <FormRow label="Address" error={errors?.address?.message}>
            <input
              className={styles.input}
              type="text"
              id="address"
              {...register("address", { required: "This field is requried" })}
            />
          </FormRow>
        </div>
        <div>
          <p className={styles.map_title}>Select your location</p>
          <Map
            location={orders.addressLatLng}
            onChange={(latlng) => {
              setOrders({ ...orders, addressLatLng: latlng });
              // const address = { addressLatLng: latlng };
              // setOrders((orders) => [...orders, address]);
            }}
          />
        </div>
        <OrderItems orders={orders} />
        <button className={styles.btn}>Payment</button>
      </form>
    </>
  );
}
