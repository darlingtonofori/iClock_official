import React from "react";
import "./CartItem.css";
import { useContext, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Asset/cart_cross_icon.png";
import { Link } from "react-router-dom";

const CartItem = () => {
  const {
    getTotalCart,
    all_product,
    cartItems,
    removeFromCart,
    applyPromo,
    promoApplied,
    getTotalCartPromote,
    selectedFaceForProducts,
    selectedStrapForProducts,
  } = useContext(ShopContext);

  // alert(`${selectedFace} - ${selectedStrap}`);
  const [promoCode, setPromoCode] = useState("");

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  const handleApplyPromoCode = async () => {
    await applyPromo(promoCode);
  };

  return (
    <div className="cartitems">
      <div className="cart_title">
        <h1>GIỎ HÀNG</h1>
      </div>
      <div className="cartitems-main">
        <p>Sản phẩm</p>
        <p>Tên</p>
        <p>Giá</p>
        <p>Số lượng</p>
        <p>Tổng cộng</p>
        <p>Xoá khỏi giỏ hàng</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          let parseNewPrice = parseInt(e.new_price.replace(/[^\d]/g, ""));
          return (
            <div>
              <div className="cartitems-format cartitems-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>
                  {e.name}
                  <div className="properties">
                    {/* Sử dụng thông tin về loại dây và mặt từ state thay vì từ props */}
                    <p className="strap_properties">
                      Loại dây: <b>{selectedStrapForProducts[e.id]}</b>
                    </p>
                    <p className="face_properties">
                      Loại mặt: <b>{selectedFaceForProducts[e.id]}</b>
                    </p>
                  </div>
                </p>
                <p>{e.new_price}</p>
                <button className="cartItem-quantity">{cartItems[e.id]}</button>
                <p>
                  {(parseNewPrice * cartItems[e.id])
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  ₫
                </p>
                <img
                  className="cartItem-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartItems-bottom">
        <div className="cartItems-total">
          <h1>Tổng tiền: </h1>
          <div>
            <div className="cartItem-total-item">
              <p>Tổng tiền sản phẩm:</p>
              {promoApplied ? (
                <p style={{ textDecoration: "line-through" }}>
                  {getTotalCart()} ₫
                </p>
              ) : (
                <p>{getTotalCart()} ₫</p>
              )}
            </div>
            {promoApplied && (
              <>
                <hr />
                <div className="cartItem-total-item">
                  <p>Giá sau khi áp dụng khuyến mãi:</p>
                  <p>{getTotalCartPromote()} ₫</p>
                </div>
              </>
            )}
            <hr />
            <div className="cartItem-total-item">
              <p>Phí vận chuyển:</p>
              <p>Miễn phí</p>
            </div>
            <hr />
            <div className="cartItem-total-item">
              <h3>Tổng cộng:</h3>
              <h3>{promoApplied ? getTotalCartPromote() : getTotalCart()} ₫</h3>
            </div>
            <Link to="/cart/checkout">
              <button className="confirm_btn">XÁC NHẬN ĐƠN HÀNG</button>
            </Link>
          </div>
          <div className="cartItems-promocode">
            <p>Nếu bạn có mã khuyến mãi, vui lòng nhập tại đây:</p>
            <div className="cartItems-promoteContainer">
              <input
                type="text"
                placeholder="Mã khuyến mãi"
                value={promoCode}
                onChange={handlePromoCodeChange}
              />
              <button className="promote_code" onClick={handleApplyPromoCode}>
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
