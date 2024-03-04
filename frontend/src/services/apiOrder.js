import axios from "axios";

// ============================order
export async function createOrder(newOrder) {
  try {
    const { data } = await axios.post("/api/orders/create", newOrder);
    return data;
  } catch (error) {
    throw new Error("Failed to create order");
  }
}

// ============================get curr user order
export async function getCurrOrder() {
  try {
    const { data } = await axios.get("/api/orders/currUserOrder");
    return data;
  } catch (error) {
    throw Error(error.message);
  }
}

// ============================payment
export async function pay(paymentId) {
  try {
    const { data } = await axios.put("/api/orders/pay", { paymentId });
    return data;
  } catch (error) {
    throw Error(error.message);
  }
}

// ============================get order by id
export async function getOrderById(orderId) {
  try {
    const { data } = await axios.get("/api/orders/track/" + orderId);
    return data;
  } catch (error) {
    throw Error(error.message);
  }
}

// ============================get curr user orders
export async function getCurrOrders({ filter }) {
  try {
    const { data } = await axios.get("/api/orders/currUserOrders");
    const orders = data.orders;

    if (filter) {
      const filteredData = await orders.filter(
        (order) => order.status === filter.value
      );
      return filteredData;
    }

    return orders;
  } catch (error) {
    throw Error(error.message);
  }
}
