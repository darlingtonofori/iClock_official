import React, { useState, useEffect } from "react";
import "./Checkout.css";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const [provinces, setProvinces] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLogin, setLogin] = useState(false);
  const [isEnough, setIsEnough] = useState(false);

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await fetch("http://localhost:4000/provinces");
      if (!response.ok) {
        throw new Error(
          "Đã có lỗi trong quá trình tải danh sách tỉnh/thành phố"
        );
      }
      const data = await response.json();
      setProvinces(data);
    } catch (error) {
      console.log(
        "Đã có lỗi trong quá trình tải danh sách tỉnh/thành phố",
        error.message
      );
    }
  };

  const checkInfo = () => {
    if (!userData.email || !userData.numberPhone) {
      alert("Vui lòng cập nhật thông tin giao hàng!");
      window.location.replace("/profile");
    } else {
      alert("Thông tin giao hàng đầy đủ! Bạn có thể tiếp tục thanh toán");
      setIsEnough(true);
    }
  };

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

  return (
    <div className="checkout-container">
      <h1>Xác nhận thông tin giao hàng</h1>
      <div className="information">
        {userData && (
          <>
            <div className="information-item">
              <p>Họ và tên khách hàng: </p>
              <input
                className="input-format"
                type="text"
                value={userData.name}
                readOnly
              />
            </div>
            <div className="information-item">
              <p>Địa chỉ email: </p>
              <input
                className="input-format"
                type="text"
                value={userData.email}
                readOnly
              />
            </div>
            <div className="information-item">
              <p>Địa chỉ giao hàng:</p>
              <input
                className="input-format"
                type="text"
                value={userData.address}
                readOnly
              />
            </div>
            <div className="information-item">
              <p>Số điện thoại: </p>
              <input
                className="input-format"
                type="text"
                value={userData.numberPhone}
                readOnly
              />
            </div>
            <p
              style={{
                fontStyle: "italic",
                fontSize: "12px",
                color: "red",
              }}
            >
              Nếu có nhầm lẫn/sai sót về thông tin vui lòng vào mục Tài khoản để
              cập nhật lại!
            </p>
          </>
        )}
      </div>
      <br />
      {!isEnough ? (
        <Link onClick={checkInfo} className="confirm-btn">
          Kiểm tra thông tin
        </Link>
      ) : (
        <Link to="/cart/checkout/confirm" className="confirm-btn">
          Thanh toán
        </Link>
      )}
    </div>
  );
};

export default Checkout;
