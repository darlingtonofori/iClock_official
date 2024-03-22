import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import empty_order from "../Asset/empty_order.png";
import "./OrderInfo.css";

const OrderInfo = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLogin, setLogin] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistricts, setSelectedDistricts] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [address, setAddress] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [mailInput, setMailInput] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [editName, setEditName] = useState(false);
  const [editMail, setEditMail] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [changePasswordClicked, setChangePasswordClicked] = useState(false);
  const [changeAddressdMode, setChangeAddressMode] = useState(false);
  const [isChangeAddress, setIsChangeAddress] = useState(false);
  const [order, setOrder] = useState(null);

  const fetchUserOrders = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const email = localStorage.getItem("email");

      const response = await fetch(
        `http://localhost:4000/userorders/${email}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error(`Lỗi: ${response.status} - ${response.statusText}`);
      }
      const userOrders = await response.json();
      setOrder(userOrders);
    } catch (error) {
      console.error("Error fetching user orders:", error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProvinces();
    fetchUserData();
    fetchUserOrders();
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

  const fetchDistricts = async (provinceName) => {
    try {
      const resp = await fetch(
        `http://localhost:4000/districts/${provinceName}`
      );
      if (!resp.ok) {
        throw new Error("Đã có lỗi trong quá trình tải danh sách quận/huyện");
      }
      const data = await resp.json();
      setDistricts(data);
    } catch (error) {
      console.log("Đã có lỗi trong quá trình tải danh sách quận/huyện");
    }
  };

  const fetchWards = async (provinceName, districtsName) => {
    try {
      const resp = await fetch(
        `http://localhost:4000/wards/${provinceName}/${districtsName}`
      );
      if (!resp.ok) {
        throw new Error("Đã có lỗi trong quá trình tải danh sách phường/xã");
      }
      const data = await resp.json();
      setWards(data);
    } catch (error) {
      console.log("Đã có lỗi trong quá trình tải danh sách phường/xã");
    }
  };

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setSelectedProvince(selectedProvince);
    setSelectedDistricts("");
    fetchDistricts(selectedProvince);
  };

  const handleDistrictChange = (e) => {
    const selectedDistricts = e.target.value;
    setSelectedDistricts(selectedDistricts);
    fetchWards(selectedProvince, selectedDistricts);
  };

  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
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
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setLogin(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="profile-container">
      {isLogin ? (
        <>
          {order && order.length > 0 ? (
            <div className="order-container">
              <h1>Thông tin đơn hàng</h1>
              <div className="list-main">
                <p>Mã đơn hàng</p>
                <p>Ngày đặt hàng</p>
                <p>Giá trị đơn hàng</p>
                <p>Trạng thái đơn hàng</p>
              </div>
              <div className="list_order ">
                <hr />
                {order.map((orderItem, index) => (
                  <Link to={`/orderdetail/${orderItem._id}`}>
                    <div className="order_detail">
                      <div key={index} className="order-item list-main">
                        <p>{orderItem._id}</p>
                        <p>
                          {moment(orderItem.createdAt).format(
                            "HH:mm DD/MM/YYYY"
                          )}
                        </p>
                        <p>{orderItem.totalAmount} ₫</p>
                        {orderItem.status === "Đang xử lý" && (
                          <strong style={{ color: "orange" }}>
                            {orderItem.status}
                          </strong>
                        )}
                        {orderItem.status === "Đã giao hàng" && (
                          <strong style={{ color: "#41a0ff" }}>
                            {orderItem.status}
                          </strong>
                        )}
                        {orderItem.status === "Đã huỷ" && (
                          <strong style={{ color: "red" }}>
                            {orderItem.status}
                          </strong>
                        )}
                        {orderItem.status === "Đang chờ xác nhận" && (
                          <strong style={{ color: "darkcyan" }}>
                            {orderItem.status}
                          </strong>
                        )}
                        {orderItem.status === "Hoàn thành" && (
                          <strong style={{ color: "lightgreen" }}>
                            {orderItem.status}
                          </strong>
                        )}
                        {orderItem.status === "Đang chờ hoàn tiền" && (
                          <strong style={{ color: "purple" }}>
                            {orderItem.status}
                          </strong>
                        )}
                        {orderItem.status === "Đang chuyển phát lại" && (
                          <strong style={{ color: "brown" }}>
                            {orderItem.status}
                          </strong>
                        )}
                        {/* <h3>Thông tin người nhận</h3>
                  <p>
                    <strong>Tên người nhận:</strong>{" "}
                    {orderItem.recipientInfo.name}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong>{" "}
                    {orderItem.recipientInfo.phoneNumber}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {orderItem.recipientInfo.address}
                  </p>
                  <p>
                    <strong>Email:</strong> {orderItem.recipientInfo.mail}
                  </p>
                  <h3>Chi tiết đơn hàng</h3>
                  <div>
                    {orderItem.orderDetails.map((item, index) => (
                      <div key={index} className="product ">
                        <div>
                          <img src={item.image} alt={item.productName} />
                        </div>
                        <div>
                          <p>
                            <strong>Tên sản phẩm:</strong> {item.productName}
                          </p>
                          <p>
                            <strong>Số lượng:</strong> {item.quantity}
                          </p>
                          <p>
                            <strong>Giá:</strong> {item.price}
                          </p>
                          <p>
                            <strong>Loại dây đồng hồ:</strong> {item.strapType}
                          </p>
                          <p>
                            <strong>Loại mặt đồng hồ:</strong> {item.faceType}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div> */}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="empty_track">
              <img src={empty_order} alt="" />
              <h2>Có vẻ hơi trống trải. Hãy mua cái gì đó nào!</h2>
            </div>
          )}
        </>
      ) : (
        <p className="error-message">
          <div>
            <button className="button-error">
              <i class="fa-regular fa-hand stopWatch"></i>
            </button>
            <div className="text-error">
              Chức năng xem thông tin người dùng chỉ khả dụng với tài khoản
              thành viên. Quý Khách cần đăng nhập để sử dụng chức năng này
            </div>
          </div>
        </p>
      )}
    </div>
  );
};

export default OrderInfo;
