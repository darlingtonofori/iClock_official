import React, { useState, useEffect } from "react";
import "./Popular.css";
import Item from "../Item/Item";

const Popular = () => {
  const [popularProduct, setPopularProduct] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/popularWoman")
      .then((res) => res.json())
      .then((data) => {
        setPopularProduct(data);
      });
  }, []);
  return (
    <div className="popular">
      <h1>Phổ biến với phái đẹp</h1>
      <hr />
      <div className="popular-item">
        {popularProduct.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            ></Item>
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
