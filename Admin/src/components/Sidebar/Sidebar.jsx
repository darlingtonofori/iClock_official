import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_icon from "../../assets/Product_Cart.svg";
import list_product from "../../assets/Product_list_icon.svg";
import customer from "../../assets/cliente.svg";
import promotion from "../../assets/promotion.svg";
import promote_icon from "../../assets/promote_icon.png";
import cost from "../../assets/cost.png";
import info from "../../assets/info.png";
import order_icon from "../../assets/order.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-items">
          <img src={add_icon} alt="" />
          <p>Thêm sản phẩm</p>
        </div>
      </Link>
      <Link to={"/addpromote"} style={{ textDecoration: "none" }}>
        <div className="sidebar-items">
          <img src={promote_icon} alt="" />
          <p style={{ fontSize: "15px" }}>Thêm khuyến mãi</p>
        </div>
      </Link>
      <Link to={"/info"} style={{ textDecoration: "none" }}>
        <div className="sidebar-items">
          <img src={info} alt="" />
          <p>Thêm thuộc tính sản phẩm</p>
        </div>
      </Link>
      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-items">
          <img src={list_product} alt="" />
          <p>Quản lý sản phẩm</p>
        </div>
      </Link>
      <Link to={"/ordermanager"} style={{ textDecoration: "none" }}>
        <div className="sidebar-items">
          <img src={order_icon} alt="" />
          <p>Quản lý đơn hàng</p>
        </div>
      </Link>
      <Link to={"/customermanager"} style={{ textDecoration: "none" }}>
        <div className="sidebar-items">
          <img src={customer} alt="" />
          <p>Quản lý khách hàng</p>
        </div>
      </Link>
      <Link to={"/promotionmanager"} style={{ textDecoration: "none" }}>
        <div className="sidebar-items">
          <img src={promotion} alt="" />
          <p>Quản lý khuyến mãi</p>
        </div>
      </Link>
      <Link to={"/statistics"} style={{ textDecoration: "none" }}>
        <div className="sidebar-items">
          <img src={cost} alt="" />
          <p>Thống kê tài sản và doanh thu</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
