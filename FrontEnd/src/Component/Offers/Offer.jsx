import React from "react";
import "./Offer.css";
import exclusive_image from "../Asset/exclusive_image.png";

const Offer = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Ưu đãi</h1>
        <h1>Dành riêng cho bạn</h1>
        <p>Các sản phẩm bán chạy</p>
        <button>Ghé thăm ngay!</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  );
};

export default Offer;
