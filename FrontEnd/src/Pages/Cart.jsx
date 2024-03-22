import React, { useContext } from "react";
import CartItems from "../Component/CartItems/CartItem";
import { ShopContext } from "../Context/ShopContext";

const Cart = () => {
  const { selectedFace, selectedStrap } = useContext(ShopContext);
  return (
    <div>
      <CartItems
        selectedFace={selectedFace}
        selectedStrap={selectedStrap}
      ></CartItems>
    </div>
  );
};

export default Cart;
