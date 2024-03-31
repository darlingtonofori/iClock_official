import React, { useRef } from "react";
import "./Hero.css";
import hand_icon from "../Asset/hand_icon.png";
import arrow_icon from "../Asset/arrow.png";
import hero_img from "../Asset/hero_image.png";
import { Link } from "react-router-dom";

const Hero = ({ collectionRef }) => {
  const handleScrollToCollection = () => {
    collectionRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Link to="/womens" className="hero">
      {/* <div className="hero-left">
        <h2>Sản phẩm mới</h2>
        <div>
          <div className="hero-hand-icon">
            <p>
              Bộ sưu tập <span style={{ color: "#41a0ff" }}>mới</span>
            </p>
          </div>
          <p>Cho tất cả mọi người</p>
        </div>
        <div className="hero-latest-btn" onClick={handleScrollToCollection}>
          <div>Xem ngay!</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_img} alt="" />
      </div> */}
    </Link>
  );
};

export default Hero;
