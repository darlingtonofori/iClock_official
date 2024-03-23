import { useState } from "react";
import "./Statistics.css";
import { useEffect } from "react";
import moment from "moment";

const Statistics = () => {
  const [selectedButton, setSelectedButton] = useState("statisProduct");
  const [all_product, setAllProducts] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [productsSell, setProductsSell] = useState([]);
  const [orderDate, setOrderDate] = useState(new Date());
  const [orderbyDate, setOrderByDate] = useState([]);
  const [haveOrder, setHaveOrder] = useState(true);

  const fetchInfor = async () => {
    try {
      const response = await fetch("http://localhost:4000/allproduct");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setAllProducts(data);
      const initialQuantities = {};
      data.forEach((product) => {
        initialQuantities[product._id] = product.quantity;
      });
      setQuantity(initialQuantities);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchProductSell = async () => {
    await fetch("http://localhost:4000/allordersx")
      .then((res) => res.json())
      .then((data) => {
        setProductsSell(data);
        console.log(data);
      });
  };

  const fetchOrderByDate = async () => {
    const date = moment(orderDate).format("YYYY-MM-DD");
    try {
      const response = await fetch(`http://localhost:4000/orderbydate/${date}`);
      const data = await response.json();
      if (data.success === false) {
        setHaveOrder(false);
      } else {
        setHaveOrder(true);
        setOrderByDate(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Xử lý lỗi khi fetch không thành công
      setHaveOrder(false);
    }
  };

  useEffect(() => {
    fetchInfor();
    fetchProductSell();
  }, []);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const response = await fetch(
        `http://localhost:4000/updateQuantity/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );
      // await fetchInfor();
      if (!response.ok) {
        throw new Error("Không thể cập nhật số lượng sản phẩm");
      }
      setQuantity((prevQuantity) => ({
        ...prevQuantity,
        [productId]: newQuantity,
      }));
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error);
    }
  };

  const changeHandler = (e) => {
    setQuantity(e.target.value);
  };

  const changeDateHandler = (e) => {
    setOrderDate(e.target.value);
  };

  const calculateTotalRevenue = () => {
    if (orderbyDate.length === 0) {
      return 0;
    }
    let totalRevenue = 0;
    orderbyDate.forEach((order) => {
      totalRevenue =
        totalRevenue + parseInt(order.totalAmount.replace(/[^\d]/g, ""));
    });
    return totalRevenue;
  };

  const totalRevenue = calculateTotalRevenue();

  return (
    <div className="statis-main">
      <div className="statis-function">
        <div
          className={selectedButton === "statisProduct" ? "selected" : ""}
          onClick={() => handleButtonClick("statisProduct")}
        >
          Thống kê sản phẩm
        </div>
        <div
          className={selectedButton === "statisRevenue" ? "selected" : ""}
          onClick={() => handleButtonClick("statisRevenue")}
        >
          Thống kê doanh thu
        </div>
        <div
          className={selectedButton === "updateQuantity" ? "selected" : ""}
          onClick={() => handleButtonClick("updateQuantity")}
        >
          Cập nhật số lượng hàng hoá
        </div>
      </div>
      <div className="function-main">
        {selectedButton === "statisProduct" && (
          <div className="ProductsSell">
            <h1>Thống kê sản phẩm</h1>
            <div className="list_order-main">
              <p>Ngày bán hàng</p>
              <p>Tên sản phẩm</p>
              <p>Loại mặt</p>
              <p>Loại dây đeo</p>
              <p>Sô lượng bán</p>
            </div>
            <div className="list-products-sell">
              <hr />
              {productsSell.map((productsellx, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className="list_order-main list_order-format"
                    >
                      <p>{productsellx.orderDate}</p>
                      <p>{productsellx.productName}</p>
                      <p>{productsellx.strapType}</p>
                      <p>{productsellx.faceType}</p>
                      <p>{productsellx.quantity}</p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        )}

        {selectedButton === "statisRevenue" && (
          <div className="quantity">
            <h1>Thống kê doanh thu</h1>
            <div className="orderDate">
              <p>Vui lòng chọn ngày đặt hàng: </p>
              <input
                type="date"
                id="orderDate"
                name="orderDate"
                value={orderDate}
                onChange={changeDateHandler}
              />
              <button onClick={fetchOrderByDate}>Liệt kê</button>
            </div>
            <div className="list_orderdt-main">
              <p>Ngày </p>
              <p>ID các đơn hàng</p>
              <p>Tiền thu được</p>
              <p>Trạng thái </p>
            </div>
            <div className="list-products-sell">
              {haveOrder ? (
                orderbyDate.map((item, i) => {
                  return (
                    <>
                      <div
                        key={i}
                        className="list_orderdt-main list_order-format "
                      >
                        <p>
                          {moment(item.createdAt).format("HH:mm DD/MM/YYYY")}
                        </p>
                        <p>{item._id}</p>
                        <p>{item.totalAmount} đ</p>
                        <p>{item.status}</p>
                      </div>
                    </>
                  );
                })
              ) : (
                <>
                  <p style={{ color: "red", textAlign: "center" }}>
                    Không có dữ liệu đơn hàng trong ngày này
                  </p>
                </>
              )}
              <div></div>
            </div>
            <p>
              {totalRevenue === 0 ? (
                <strong>Không có doanh thu</strong>
              ) : (
                <>
                  Tổng doanh thu:{" "}
                  <strong style={{ color: "#41a0ff" }}>
                    {totalRevenue
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    đ
                  </strong>{" "}
                </>
              )}
            </p>
          </div>
        )}

        {selectedButton === "updateQuantity" && (
          <div className="quantity">
            <h1>Cập nhật số lượng hàng hoá</h1>
            <div className="list_product-main">
              <p>Sản phẩm</p>
              <p>Tên sản phẩm</p>
              <p>Giá niêm yết</p>
              <p>Giá khuyến mãi</p>
              <p>Thể loại</p>
              <p>Số lượng</p>
            </div>
            <div className="list_product-allproducts">
              <hr />
              {all_product.map((product, i) => {
                return (
                  <>
                    <div
                      key={product._id}
                      className="list_product-main list_product-format"
                    >
                      <img
                        src={product.image}
                        alt=""
                        className="list_product-icon"
                      />
                      <p>{product.name}</p>
                      <p>{product.old_price}đ</p>
                      <p>{product.new_price}đ</p>
                      <p>{product.category}</p>
                      <input
                        type="number"
                        value={quantity[product._id]}
                        onChange={(e) => {
                          changeHandler(e);
                          handleQuantityChange(product._id, e.target.value);
                        }}
                      />
                    </div>
                    <hr />
                  </>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics;
