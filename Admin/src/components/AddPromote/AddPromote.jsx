import { useState } from "react";
import "./AddPromote.css";

const AddPromote = () => {
  const [promote, setPromote] = useState({
    id: "",
    name: "",
    startDate: new Date(),
    endDate: new Date(),
    discount: "",
  });

  const changeHandler = (e) => {
    setPromote({ ...promote, [e.target.name]: e.target.value });
  };

  const addPromotion = async () => {
    try {
      const promotionsCopy = { ...promote };

      await fetch("http://localhost:4000/addpromotion", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promotionsCopy),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success
            ? alert("Mã khuyến mãi chưa được thêm")
            : alert("Đã thêm mã khuyến mãi");
        });
    } catch (error) {
      console.error("Lỗi khi thêm khuyến mãi:", error);
    }
  };

  return (
    <div className="add-promote">
      <div className="addpromote-item-input">
        <p>Nội dung khuyến mãi</p>
        <input
          value={promote.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Nhập vào đây"
        />
      </div>
      <div className="addpromote-date">
        <div className="addpromote-item-input">
          <p>Ngày bắt đầu</p>
          <input
            value={promote.startDate}
            onChange={changeHandler}
            type="date"
            name="startDate"
            placeholder="Nhập vào đây"
          />
        </div>
        <div className="addproduct-item-input">
          <p>Ngày kết thúc</p>
          <input
            value={promote.endDate}
            onChange={changeHandler}
            type="date"
            name="endDate"
            placeholder="Nhập vào đây"
          />
        </div>
      </div>
      <div className="addproduct-item-input">
        <p>Giá trị giảm giá (đơn vị %)</p>
        <input
          value={promote.discount}
          onChange={changeHandler}
          type="text"
          name="discount"
          placeholder="Nhập vào đây"
        />
      </div>
      <button
        onClick={() => {
          addPromotion();
        }}
        className="addpromote-button"
      >
        Thêm khuyến mãi
      </button>
    </div>
  );
};

export default AddPromote;
