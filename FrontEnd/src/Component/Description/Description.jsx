import React from "react";
import "./Description.css";
import { ShopContext } from "../../Context/ShopContext";

const Description = (props) => {
  const { product } = props;
  return (
    <div className="description">
      <div className="description-nav">
        <div className="description-nav-container">Mô tả</div>
      </div>
      <div className="description-content">
        <p>{product.description_detail}</p>
      </div>
    </div>
  );
};

export default Description;
