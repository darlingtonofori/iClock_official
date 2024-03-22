import React, { useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function scrollToTop() {
  window.scrollTo(0, 0);
}

const Footer = () => {
  return (
    <div className="footer-new">
      <div className="infomation-footer">
        <p>iClock</p>
        <span>Nơi thời trang được lên ngôi</span>
        <div className="phone-info">
          <i class="fa-solid fa-phone"></i>
          <span>0123456789</span>
        </div>
        <div className="social-info">
          <i class="fa-solid fa-earth-americas"></i>
          <span>www.iclock.vn</span>
        </div>
        <div className="mail-info">
          <i class="fa-solid fa-envelope"></i>
          <span>iclockhotro@gmail.com</span>
        </div>
        <div className="address-info">
          <i class="fa-solid fa-location-dot"></i>
          <span>
            Khu 2, đường 3 tháng 2, phường Xuân Khánh, quận Ninh Kiều, Cần Thơ
          </span>
        </div>
      </div>
      <div className="footer-link">
        <div className="social-media">
          <div className="link">
            <span>Hỗ trợ</span>
            <ul>
              <li>
                <Link onClick={scrollToTop} to="/security">
                  Bảo mật thông tin
                </Link>
              </li>
              <li>
                <Link onClick={scrollToTop} to="/warranty">
                  Bảo hành và đổi trả
                </Link>
              </li>
              <li>
                <Link onClick={scrollToTop} to="/eula">
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="social-media">
          <div className="link">
            <span>Sản phẩm</span>
            <ul>
              <li>
                <Link to={"/mens"}>Phái Mạnh</Link>
              </li>
              <li>
                <Link to={"/womens"}>Phái Đẹp</Link>
              </li>
              <li>
                <Link to={"/kids"}>Trẻ Em</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
