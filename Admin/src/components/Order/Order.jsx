import { useEffect, useState } from "react";
import "./Order.css";
import { Link } from "react-router-dom";
import moment from "moment";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [foundOrder, setFoundOrder] = useState(null);

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

  const handleSearch = async () => {
    try {
      if (!orderId) {
        // Nếu không có orderId, hiển thị toàn bộ đơn hàng
        setFoundOrder(null);
        return;
      }
      const response = await fetch(`http://localhost:4000/order/${orderId}`);
      if (!response.ok) {
        throw new Error("Không thể tìm đơn hàng");
      }
      const data = await response.json();
      setFoundOrder(data);
    } catch (error) {
      console.error("Lỗi khi tìm đơn hàng:", error.message);
    }
  };

  return (
    <div className="list-order">
      <h1>Danh sách đơn hàng</h1>
      <div className="search-container">
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>
      <div className="order-list">
        <div className="list_order-main">
          <p>Mã đơn hàng</p>
          <p>Tên người nhận</p>
          <p>Giá tiền</p>
          <p>Ngày đặt</p>
          <p>Trạng thái</p>
        </div>
        {foundOrder ? (
          <Link
            to={`/orderdetail/${foundOrder._id}`}
            style={{ textDecoration: "none" }}
          >
            <div className="list_order-main list_order-format">
              <p>{foundOrder._id}</p>
              <p>{foundOrder.recipientInfo.name}</p>
              <p>{foundOrder.totalAmount} ₫</p>
              <p>{moment(foundOrder.createdAt).format("HH:mm DD/MM/YYYY")}</p>
              {foundOrder.status === "Đang xử lý" && (
                <strong style={{ color: "orange" }}>{foundOrder.status}</strong>
              )}
              {foundOrder.status === "Đã giao hàng" && (
                <strong style={{ color: "blue" }}>{foundOrder.status}</strong>
              )}
              {foundOrder.status === "Đã huỷ" && (
                <strong style={{ color: "red" }}>{foundOrder.status}</strong>
              )}
              {foundOrder.status === "Đang chờ xác nhận" && (
                <strong style={{ color: "darkcyan" }}>
                  {foundOrder.status}
                </strong>
              )}
              {foundOrder.status === "Hoàn thành" && (
                <strong style={{ color: "lightgreen" }}>
                  {foundOrder.status}
                </strong>
              )}
              {foundOrder.status === "Đang chờ hoàn tiền" && (
                <strong style={{ color: "purple" }}>{foundOrder.status}</strong>
              )}
              {foundOrder.status === "Đang chuyển phát lại" && (
                <strong style={{ color: "brown" }}>{foundOrder.status}</strong>
              )}
            </div>
          </Link>
        ) : (
          <>
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
                      <strong style={{ color: "orange" }}>
                        {order.status}
                      </strong>
                    )}
                    {order.status === "Đã giao hàng" && (
                      <strong style={{ color: "blue" }}>{order.status}</strong>
                    )}
                    {order.status === "Đã huỷ" && (
                      <strong style={{ color: "red" }}>{order.status}</strong>
                    )}
                    {order.status === "Đang chờ xác nhận" && (
                      <strong style={{ color: "darkcyan" }}>
                        {order.status}
                      </strong>
                    )}
                    {order.status === "Hoàn thành" && (
                      <strong style={{ color: "lightgreen" }}>
                        {order.status}
                      </strong>
                    )}
                    {order.status === "Đang chờ hoàn tiền" && (
                      <strong style={{ color: "purple" }}>
                        {order.status}
                      </strong>
                    )}
                    {order.status === "Đang chuyển phát lại" && (
                      <strong style={{ color: "brown" }}>{order.status}</strong>
                    )}
                    {/* <p>{order.status}</p> */}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Order;
