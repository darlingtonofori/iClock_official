import React, { useState } from "react";
import "./Promotion.css";
import { useEffect } from "react";
import remove_icon from "../../assets/cross_icon.png";
import moment from "moment";

const Promotion = () => {
  const [allpromotes, setAllPromotes] = useState([]);

  const fetchInfor = async () => {
    await fetch("http://localhost:4000/allpromotions")
      .then((resp) => resp.json())
      .then((data) => setAllPromotes(data));
  };

  useEffect(() => {
    fetchInfor();
  }, []);

  const removePromote = async (id) => {
    await fetch("http://localhost:4000/removepromote", {
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
    <div className="promote">
      <h1>Danh sách mã khuyến mãi</h1>
      <div className="promote-main">
        <p>Mã khuyến mãi</p>
        <p>Tên khuyến mãi</p>
        <p>Ngày bắt đầu</p>
        <p>Ngày kết thúc</p>
        <p>Giá trị giảm</p>
        <p>Xoá khuyến mãi</p>
      </div>
      <div className="promote-allpromotes">
        <hr />
        {allpromotes.map((promote, i) => {
          return (
            <>
              <div key={i} className="promote-main promote-format">
                <p>{promote.code}</p>
                <p>{promote.name}</p>
                <p>
                  {moment.utc(promote.startDate).format("HH:mm DD/MM/YYYY")}
                </p>
                <p>{moment.utc(promote.endDate).format("HH:mm DD/MM/YYYY")}</p>
                <p>{promote.discount}%</p>
                <img
                  onClick={() => removePromote(promote.id)}
                  src={remove_icon}
                  alt=""
                  className="promote-remove-icon"
                />
              </div>
            </>
          );
        })}
        <hr />
      </div>
    </div>
  );
};

export default Promotion;
