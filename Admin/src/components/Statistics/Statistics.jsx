import React, { useState } from "react";
import "./Statistics.css";
import { useEffect } from "react";

const Statistics = () => {
  const [selectedButton, setSelectedButton] = useState("statisProduct");
  const [all_product, setAllProducts] = useState([]);
  const [quantity, setQuantity] = useState({});

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

  useEffect(() => {
    fetchInfor();
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
          <div>
            <h1>Thống kê sản phẩm</h1>
          </div>
        )}
        {selectedButton === "statisRevenue" && (
          <div>
            <h1>Thống kê doanh thu</h1>
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
