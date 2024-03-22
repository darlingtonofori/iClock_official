// import React from "react";
import "./Admin.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../components/AddProduct/AddProduct";
import ListProduct from "../../components/ListProduct/ListProduct";
import Customer from "../../components/Customer/Customer";
import Promotion from "../../components/Promotion/Promotion";
import AddPromote from "../../components/AddPromote/AddPromote";
import Introduction from "../../components/Introduction/Introduction";
import Statistics from "../../components/Statistics/Statistics";
import Info from "../../components/Info/Info";
import Order from "../../components/Order/Order";
import OrderDetail from "../../components/OrderDetail/OrderDetail";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar></Sidebar>
      <Routes>
        <Route path="/" element={<Introduction />}></Route>
        <Route path="/addproduct" element={<AddProduct />}></Route>
        <Route path="/addpromote" element={<AddPromote />}></Route>
        <Route path="/listproduct" element={<ListProduct />}></Route>
        <Route path="/customermanager" element={<Customer />}></Route>
        <Route path="/promotionmanager" element={<Promotion />}></Route>
        <Route path="/statistics" element={<Statistics />}></Route>
        <Route path="/info" element={<Info />}></Route>
        <Route path="/ordermanager" element={<Order />}></Route>
        <Route path="/orderdetail/:orderId" element={<OrderDetail />}></Route>
      </Routes>
    </div>
  );
};

export default Admin;
