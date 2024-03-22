import React, { useState } from "react";
import ProfileInfo from "../ProfileInfo/ProfileInfo"; // Import ProfileInfo component
import OrderInfo from "../OrderInfo/OrderInfo"; // Import OrderInfo component
import "./Profile.css";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile"); // State để theo dõi tab hiện tại

  // Function để chuyển tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="profile-container">
      <div className="tabs">
        <div
          className={`tab ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => handleTabChange("profile")}
        >
          Thông tin người dùng
        </div>
        <div
          className={`tab ${activeTab === "order" ? "active" : ""}`}
          onClick={() => handleTabChange("order")}
        >
          Thông tin đơn hàng
        </div>
      </div>
      <div>
        {activeTab === "profile" && <ProfileInfo />}{" "}
        {activeTab === "order" && <OrderInfo />}{" "}
      </div>
    </div>
  );
};

export default Profile;
