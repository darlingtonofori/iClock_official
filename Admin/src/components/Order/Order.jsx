import { useEffect, useState } from "react";
import "./Order.css";
import { Link } from "react-router-dom";
import moment from "moment";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:4000/allorders");
      if (!response.ok) {
        throw new Error("Không thể lấy danh sách đơn hàng");
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error.message);
    }
  };

  return (
    <div className="list-order">
      <div className="order-list">
        <h1>Danh sách đơn hàng</h1>
        <div className="list_order-main">
          <p>Mã đơn hàng</p>
          <p>Tên người nhận</p>
          <p>Giá tiền</p>
          <p>Ngày đặt</p>
          <p>Trạng thái</p>
        </div>
        <div className="list-order_allorder">
          <hr />
          {orders.map((order, index) => (
            <Link
              to={`/orderdetail/${order._id}`}
              style={{ textDecoration: "none" }}
              key={index}
            >
              <div className="list_order-main list_order-format">
                <p>{order._id}</p>
                <p>{order.recipientInfo.name}</p>
                <p>{order.totalAmount} ₫</p>
                <p>{moment(order.createdAt).format("HH:mm DD/MM/YYYY")}</p>
                {order.status === "Đang xử lý" && (
                  <strong style={{ color: "orange" }}>{order.status}</strong>
                )}
                {order.status === "Đã giao hàng" && (
                  <strong style={{ color: "blue" }}>{order.status}</strong>
                )}
                {order.status === "Đã huỷ" && (
                  <strong style={{ color: "red" }}>{order.status}</strong>
                )}
                {order.status === "Đang chờ xác nhận" && (
                  <strong style={{ color: "darkcyan" }}>{order.status}</strong>
                )}
                {order.status === "Hoàn thành" && (
                  <strong style={{ color: "lightgreen" }}>
                    {order.status}
                  </strong>
                )}
                {order.status === "Đang chờ hoàn tiền" && (
                  <strong style={{ color: "purple" }}>{order.status}</strong>
                )}
                {order.status === "Đang chuyển phát lại" && (
                  <strong style={{ color: "brown" }}>{order.status}</strong>
                )}
                {/* <p>{order.status}</p> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
