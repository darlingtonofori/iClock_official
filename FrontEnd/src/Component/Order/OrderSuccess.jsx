import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import "./OrderSuccess.css";
import { ShopContext } from "../../Context/ShopContext";

<script src="https://www.paypal.com/sdk/js?client-id=AdgCcmmUMHDtf21ojC4BkRqQbeTld2wA8VRGpcs_OWGKEAgErBQI-wuX2_k56pGD1Qlzsh2dfAUXchOn"></script>;
const Confirmation = (props) => {
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    if (location.state && location.state.paymentMethod) {
      setPaymentMethod(location.state.paymentMethod);
    }
  }, [location]);

  const [userData, setUserData] = useState(null);
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
  return (
    <div className="confirm_container" style={{ background: "white" }}>
      <h2>Cảm ơn bạn đã mua sắm tại IClock</h2>
      <div className="overview">
        <div className="SuccessPayment">
          <h3
            className="SuccessNote"
            style={{ margin: 0, textAlign: "center", fontSize: "30px" }}
          >
            Đơn đặt hàng thành công
          </h3>
          <i class="fa-solid fa-check SuccessPayment-icon"></i>
        </div>
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
                                  Số lượng: <strong>{quantity}</strong>
                                </p>
                                <p>
                                  Loại dây: <strong>{selectedFace}</strong>
                                </p>
                                <p>
                                  Loại mặt: <strong>{selectedStrap}</strong>
                                </p>
                                <p>
                                  Giá: <strong>{product.new_price} ₫</strong>
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
                <div className="PaymentWay">
                  <h3>Phương thức thanh toán đã chọn:</h3>
                  <div className="PaymentBox">
                    {paymentMethod === "cash" && (
                      <>
                        <h4>Thanh toán bằng tiền mặt</h4>
                        {/* Ảnh hoặc biểu tượng khác nếu cần */}
                      </>
                    )}
                    {paymentMethod !== "cash" && (
                      <>
                        <h4> Phương thức thanh toán Paypal</h4>
                        <img
                          src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/pp-acceptance-medium.png"
                          alt=""
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
