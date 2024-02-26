import { createContext, useContext, useState } from "react";
import { SampleCarts } from "../helper/data";

const CartContext = createContext();

function CartProvider({ children }) {
  const [carts, setCarts] = useState(SampleCarts);
  const [totalPrice, setTotalPrice] = useState(123000);
  const [totalCount, setTotalCount] = useState(4);

  return (
    <CartContext.Provider value={{ carts, setCarts, totalPrice, totalCount }}>
      {children}
    </CartContext.Provider>
  );
}

function useCarts() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("CartsContext cant be called outside its provider");
  }
  return context;
}

export { CartProvider, useCarts };
