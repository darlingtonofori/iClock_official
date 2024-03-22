import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import "./OrderDetail.css";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const fetchOrderDetail = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/orderdetail/${orderId}`
      );
      if (!response.ok) {
        throw new Error("Không thể lấy chi tiết đơn hàng");
      }
      const data = await response.json();
      setOrder(data);
      setSelectedStatus(data.status);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", error.message);
    }
  };

  const fetchStatusOrder = async () => {
    try {
      const response = await fetch("http://localhost:4000/allstatus");
      if (!response.ok) {
        throw new Error("Không thể lấy trạng thái đơn hàng");
      }
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error("Lỗi khi lấy trạng thái đơn hàng:", error.message);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
    fetchStatusOrder();
  }, []);

  if (!order) {
    return <div>Loading...</div>;
  }

  const handleDeleteOrder = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/deleteorder/${orderId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Không thể xóa đơn hàng");
      }
      alert("Đơn hàng đã được xoá!");
      navigate(`/profile`);
    } catch (error) {
      console.error("Lỗi khi xóa đơn hàng:", error.message);
    }
  };

  return (
    <div className="order-detail">
      <h2>
        Chi tiết đơn hàng{" "}
        <strong style={{ color: "#41a0ff" }}>#{order._id}</strong>
      </h2>
      <div style={{ margin: "30px auto" }}>
        <p>
          <strong>Người mua:</strong> {order.recipientInfo.name}
        </p>
        <p>
          <strong>Thời gian mua:</strong>{" "}
          {moment(order.createdAt).format("HH:mm DD/MM/YYYY")}
        </p>
        <p>
          <strong>Địa chỉ giao hàng:</strong> {order.recipientInfo.address}
        </p>
        <p>
          <strong>Số điện thoại:</strong> {order.recipientInfo.phoneNumber}
        </p>
      </div>
      <div style={{ margin: "auto auto 30px auto" }}>
        <h3>Sản phẩm trong đơn hàng</h3>
        <div className="detail-container">
          {order.orderDetails.map((item, index) => (
            <>
              <div className="items">
                <div key={index} className="image-item">
                  <img src={item.image} alt="" />
                </div>
                <div className="detail-items" key={index}>
                  <strong>{item.productName}</strong>
                  <p>
                    &#9830; Số lượng: <strong>{item.quantity}</strong>
                  </p>
                  <p>
                    &#9830; Loại dây: <strong>{item.strapType}</strong>
                  </p>
                  <p>
                    &#9830; Loại mặt: <strong>{item.faceType}</strong>
                  </p>
                  <p>
                    &#9830; Giá: <strong>{item.price} ₫</strong>
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      <p>
        <strong>Phương thức thanh toán: </strong>
        {order.paymentMethod === "cash" ? "Tiền mặt" : "Paypal"}
      </p>
      {order.paymentMethod === "cash" ? (
        <p>
          <strong>Tổng số tiền cần thanh toán:</strong> {order.totalAmount} ₫
        </p>
      ) : (
        <p>
          <strong>Tổng số tiền đã thanh toán:</strong> {order.totalAmount} ₫
        </p>
      )}
      <div className="status_order">
        <p>
          <strong>Trạng thái đơn hàng: </strong>
          {order.status === "Đang xử lý" && (
            <strong style={{ color: "orange" }}>{order.status}</strong>
          )}
          {order.status === "Đã giao hàng" && (
            <strong style={{ color: "#41a0ff" }}>{order.status}</strong>
          )}
          {order.status === "Đã huỷ" && (
            <strong style={{ color: "red" }}>{order.status}</strong>
          )}
          {order.status === "Đang chờ xác nhận" && (
            <strong style={{ color: "darkcyan" }}>{order.status}</strong>
          )}
          {order.status === "Hoàn thành" && (
            <strong style={{ color: "lightgreen" }}>{order.status}</strong>
          )}
          {order.status === "Đang chờ hoàn tiền" && (
            <strong style={{ color: "purple" }}>{order.status}</strong>
          )}
          {order.status === "Đang chuyển phát lại" && (
            <strong style={{ color: "brown" }}>{order.status}</strong>
          )}
        </p>
      </div>
      <div className="cancel_order">
        {order.status === "Đang xử lý" && (
          <div>
            {/* <strong style={{ color: "orange" }}>
            {order.status} bạn có muốn
          </strong> */}
            <button onClick={handleDeleteOrder}>Hủy đơn hàng</button>
          </div>
        )}
        {order.status === "Đang chờ xác nhận" && (
          <div>
            {/* <strong style={{ color: "darkcyan" }}>
            {order.status} bạn có muốn{" "}
          </strong> */}
            <button onClick={handleDeleteOrder}>Hủy đơn hàng</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
