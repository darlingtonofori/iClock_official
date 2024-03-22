import { useEffect, useState } from "react";
import "./ListProduct.css";
import remove_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfor = async () => {
    await fetch("http://localhost:4000/allproduct")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchInfor();
  }, []);

  const removeProduct = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfor();
  };
  return (
    <div className="list-product">
      <h1>Danh sách tất cả sản phẩm</h1>
      <div className="list_product-main">
        <p>Sản phẩm</p>
        <p>Tên sản phẩm</p>
        <p>Giá niêm yết</p>
        <p>Giá khuyến mãi</p>
        <p>Thể loại</p>
        <p>Xoá sản phẩm</p>
      </div>
      <div className="list_product-allproducts">
        <hr />
        {allproducts.map((product, i) => {
          return (
            <>
              <div key={i} className="list_product-main list_product-format">
                <img src={product.image} alt="" className="list_product-icon" />
                <p>{product.name}</p>
                <p>{product.old_price}đ</p>
                <p>{product.new_price}đ</p>
                <p>{product.category}</p>
                <img
                  onClick={() => {
                    removeProduct(product.id);
                  }}
                  className="list_product-remove-icon"
                  src={remove_icon}
                  alt=""
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
