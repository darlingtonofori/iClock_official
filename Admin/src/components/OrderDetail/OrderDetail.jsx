import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import "./OrderDetail.css";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const fetchOrderDetail = useCallback(async () => {
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
  }, [orderId]);

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
  }, [fetchOrderDetail]);

  if (!order || !status.length) {
    return <div>Loading...</div>;
  }

  const changeStatus = async (orderId, newStatus) => {
    try {
      await fetch(`http://localhost:4000/updatestatusorder/${orderId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });
      await fetchOrderDetail();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleStatusChange = async (e) => {
    setSelectedStatus(e.target.value);
    await changeStatus(orderId, e.target.value);
  };

  return (
    <div className="order-detail">
      <h2>
        Chi tiết đơn hàng{" "}
        <strong style={{ color: "#41a0ff" }}>#{order._id}</strong>
      </h2>
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
                  &#9830; Giá: <strong>{item.price} đ</strong>
                </p>
              </div>
            </div>
          </>
        ))}
      </div>
      <p>
        <strong>Phương thức thanh toán: </strong>
        {order.paymentMethod === "cash" ? "Tiền mặt" : "Paypal"}
      </p>
      <p>
        <strong>Tiền cần thanh toán ban đầu:</strong> {order.totalBfPromote} đ
      </p>
      <p>
        <strong>Khuyến mãi:</strong>{" "}
        <span style={{ color: "rgb(65, 160, 255)", fontWeight: "600" }}>
          Giảm {order.discountApplied}
        </span>
      </p>
      {order.paymentMethod === "cash" ? (
        <p>
          <strong>Tổng số tiền cần thanh toán:</strong> {order.totalAmount} đ
        </p>
      ) : (
        <p>
          <strong>Tổng số tiền đã thanh toán:</strong> {order.totalAmount} đ
        </p>
      )}
      <div className="status_order">
        <p>
          <strong>Trạng thái đơn hàng</strong>
        </p>
        <select
          className="order_input"
          value={selectedStatus}
          onChange={(e) => {
            handleStatusChange(e);
            changeStatus(order._id, e.target.value);
          }}
        >
          <option value="">Chọn trạng thái đơn hàng</option>
          {status.map((statusItem, index) => (
            <option key={index} value={statusItem.name}>
              {statusItem.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default OrderDetail;
