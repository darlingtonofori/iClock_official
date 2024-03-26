import React, { useState, useEffect, useContext } from "react";
import "./Confirmation.css";
import { ShopContext } from "../../Context/ShopContext";
import { PayPalButton } from "react-paypal-button-v2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Confirmation = () => {
  const [userData, setUserData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paySuccess, setPaySuccess] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const {
    cartItems,
    all_product,
    getTotalCart,
    getTotalCartPromote,
    discount,
    selectedFaceForProducts,
    selectedStrapForProducts,
  } = useContext(ShopContext);

  const totalAmountToPay = getTotalCartPromote();

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      if (token) {
        setLogin(true);
      } else {
        setLogin(false);
      }
      const email = localStorage.getItem("email");
      const resp = await fetch(`http://localhost:4000/profile/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!resp) {
        setLogin(false);
        throw new Error(`Lỗi: ${response.status} - ${response.statusText}`);
      }
      const userData = await resp.json();
      setUserData(userData.user);
      if (userData.user.address) {
        const addressParts = userData.user.address.split(", ");
        setAddress(addressParts[0]);
        setSelectedWard(addressParts[1]);
        setSelectedDistricts(addressParts[2]);

        // Lấy tên tỉnh/thành phố bằng cách lấy phần còn lại của chuỗi sau khi loại bỏ phần đã lấy trước đó
        const provinceAndRest = addressParts.slice(3).join(", ");
        setSelectedProvince(provinceAndRest);
      }
      setNameInput(userData.user.name);
      setMailInput(userData.user.email);
      setNumberPhone(userData.user.numberPhone);
    } catch (error) {
      setLogin(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  //   alert(discount);
  //Bỏ dấu chấm
  const pricetotal = parseFloat(getTotalCartPromote()).toFixed(3);
  //Ép kiểu về số
  const pricetotal2 = pricetotal;
  //Chuyển về tiền tệ
  const pricetotal3 = (pricetotal2 * 1000) / 23.5;
  //Làm tròn 2 số thập phân
  const pricetotal4 = pricetotal3.toFixed(2);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const navigate = useNavigate();
  const onSuccessPaypal = async () => {
    setPaymentMethod("paypal");
    setPaySuccess(true);
  };

  const handlePlaceOrder = async () => {
    try {
      if (!paymentMethod) {
        throw new Error("Vui lòng chọn phương thức thanh toán");
      }
      const orderData = {
        recipientInfo: {
          mail: userData.email,
          name: userData.name,
          phoneNumber: userData.numberPhone,
          address: userData.address,
        },
        orderDetails: Object.keys(cartItems)
          .map((itemId) => {
            const quantity = cartItems[itemId];
            const product = all_product.find(
              (item) => item.id === parseInt(itemId)
            );
            if (!product || quantity < 0) return null;
            const selectedFace = selectedFaceForProducts[itemId];
            const selectedStrap = selectedStrapForProducts[itemId];
            if (quantity > 0) {
              return {
                idProduct: product._id,
                image: product.image,
                productName: product.name,
                quantity: quantity,
                price: product.new_price,
                strapType: selectedFace,
                faceType: selectedStrap,
              };
            } else {
              return null; // Trả về null cho các sản phẩm có quantity <= 0
            }
          })
          .filter(Boolean),
        totalBfPromote: getTotalCart(),
        totalAmount: getTotalCartPromote(),
        paymentMethod: paymentMethod,
        discountApplied: `${discount}%`,
      };

      const token = localStorage.getItem("auth-token");
      const email = localStorage.getItem("email");

      const response = await fetch("http://localhost:4000/addorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(
          `Lỗi: ${response.status} - ${response.statusText} - ${product.name}`
        );
      }
      navigate("/order", {
        state: { paymentMethod: paymentMethod },
      });
    } catch (error) {
      console.error("Lỗi khi lưu đơn hàng:", error.message);
    }
  };

  useEffect(() => {
    if (paySuccess) {
      handlePlaceOrder();
    }
  }, [paySuccess]);

  return (
    <div className="confirm_container">
      <h2>Thông tin giao hàng</h2>
      <div className="overview">
        <div className="delivery_info">
          {userData && (
            <>
              <div className="main">
                <div className="contact_container">
                  <h3>Thông tin người nhận</h3>
                  <div className="contact_info">
                    <p>
                      Tên người nhận: <strong>{userData.name}</strong>
                    </p>
                    <p>
                      Số điện thoại: <strong>{userData.numberPhone}</strong>
                    </p>
                    <p>
                      Địa chỉ: <strong>{userData.address}</strong>
                    </p>
                  </div>
                </div>
                <div className="confirm_container">
                  <h3>Thông tin đơn hàng</h3>
                  <div className="confirm_detail">
                    {Object.keys(cartItems).map((itemId) => {
                      const quantity = cartItems[itemId];
                      const product = all_product.find(
                        (item) => item.id === parseInt(itemId)
                      );
                      if (!product) return null;
                      const selectedFace = selectedFaceForProducts[itemId];
                      const selectedStrap = selectedStrapForProducts[itemId];

                      return (
                        quantity > 0 && (
                          <>
                            <div key={itemId} className="cartItem">
                              <img src={product.image} alt={product.name} />{" "}
                              {/* Hiển thị hình ảnh */}
                              <div className="product_info">
                                <p>
                                  Tên sản phẩm: <strong>{product.name}</strong>
                                </p>
                                <p>
                                  Số lượng: <strong>{quantity} chiếc</strong>
                                </p>
                                <p>
                                  Giá: <strong>{product.new_price} ₫</strong>
                                </p>
                                <p>
                                  Loại dây: <strong>{selectedFace}</strong>
                                </p>
                                <p>
                                  Loại mặt: <strong>{selectedStrap}</strong>
                                </p>
                                {/* Thêm các thông tin khác nếu cần */}
                              </div>
                            </div>
                          </>
                        )
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="payment">
                <div className="cost">
                  <h3>Tiền thanh toán</h3>
                  <p>
                    Tiền ban đầu: <strong>{getTotalCart()} ₫</strong>
                  </p>
                  <p>
                    Khuyến mãi được giảm: <strong>{discount}%</strong>
                  </p>
                  <p>
                    Tiền sau khuyến mãi:
                    <strong>
                      {" "}
                      {discount > 0
                        ? `${getTotalCartPromote()} ₫ (Giảm ${discount}%)`
                        : `${getTotalCartPromote()} ₫`}
                    </strong>
                  </p>
                  <p>
                    Phí vận chuyển:
                    <strong> Miễn phí</strong>
                  </p>
                  <hr />
                  <p style={{ marginTop: "20px" }}>
                    Giá trị thực cần phải trả:{" "}
                    <strong>{getTotalCartPromote()} ₫</strong>
                  </p>
                </div>
                <div className="checkout">
                  <ul className="Paypal-edit">
                    <h3>Chọn phương thức thanh toán</h3>
                    <div className="cash_directly">
                      <input
                        type="radio"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        onChange={handlePaymentMethodChange}
                      />{" "}
                      Thanh toán bằng tiền mặt
                    </div>
                    <PayPalButton
                      amount={pricetotal4}
                      onSuccess={onSuccessPaypal}
                    />
                  </ul>
                </div>
              </div>
              <div className="confirm">
                {paymentMethod === "cash" && (
                  <button
                    onClick={() => {
                      handlePlaceOrder();
                      // navigate("/order", {
                      //   state: { paymentMethod: paymentMethod },
                      // });
                    }}
                  >
                    Đặt hàng
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
