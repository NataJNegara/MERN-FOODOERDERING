import { sendEmailReceipt } from "../helpers/mailHelper.js";
import Order from "../models/OrderModel.js";
import User from "../models/UserModel.js";

// ======================================CREATE NEW ORDER
export const createOrder = async (req, res) => {
  const order = req.body;
  if (!order) {
    return res.status(400).json({ error: "Cart is empty!" });
  }

  //   delete
  await Order.deleteOne({
    user: req.user.id,
    status: "new",
  });

  //   create new Order
  const newOrder = new Order({
    ...order,
    user: req.user.id,
    email: req.user.email,
  });
  await newOrder.save();
  res.send(newOrder);
};

// ======================================GET CURR USER ORDER
export const getCurrOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ user: req.user.id, status: "new" });
    return res.status(200).json({ order });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ======================================PAYMENT
export const payment = async (req, res) => {
  const { paymentId } = req.body;

  const order = await Order.findOne({ user: req.user.id, status: "new" });
  if (!order) {
    return res.status(400).json({ error: "Order is not found" });
  }

  // input payment id and change order status
  order.paymentId = paymentId;
  order.status = "payed";

  try {
    await order.save();

    // sending email
    sendEmailReceipt(order);

    res.send(order._id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ======================================GET ORDER BY ID
export const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  // get curr user (admin able to see a order)
  // and to make sure curr user cant not see another user order
  const user = await User.findById(req.user.id);
  const filter = {
    _id: orderId,
  };
  if (!user.isAdmin) {
    filter.user = user._id;
  }

  const order = await Order.findOne(filter);
  if (!order) {
    return res.status(401).json({ error: "Unathorized" });
  }
  return res.send(order);
};

// ======================================GET ORDERS(ALL) CURR USER
export const getCurrUserOrders = async (req, res) => {
  // get curr logged user
  const user = await User.findById(req.user.id);

  // check if curr user is admin he able to see all orders
  const filter = {};
  if (!user.isAdmin) {
    filter.user = user._id;
  }

  try {
    const orders = await Order.find(filter).sort({
      createdAt: "desc",
    });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
