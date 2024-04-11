import { useState } from "react";
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

  const removePromote = async (promoteCode) => {
    await fetch("http://localhost:4000/removepromote", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: promoteCode }),
    });
    await fetchInfor();
  };

  const getStatus = (startDate, endDate) => {
    const currentDate = moment();
    const start = moment.utc(startDate);
    const end = moment.utc(endDate);

    if (currentDate.isBefore(start)) {
      return "Chưa bắt đầu";
    } else if (currentDate.isAfter(end)) {
      return "Đã kết thúc";
    } else {
      return "Đang sử dụng";
    }
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
        <p>Trạng thái</p>
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
                {/* Trạng thái */}
                {getStatus(promote.startDate, promote.endDate) ===
                  "Chưa bắt đầu" && (
                  <p style={{ color: "orange", fontSize: "14px" }}>
                    <strong>
                      {getStatus(promote.startDate, promote.endDate)}
                    </strong>
                  </p>
                )}
                {getStatus(promote.startDate, promote.endDate) ===
                  "Đang sử dụng" && (
                  <p style={{ color: "#41a0ff", fontSize: "14px" }}>
                    <strong>
                      {getStatus(promote.startDate, promote.endDate)}
                    </strong>
                  </p>
                )}
                {getStatus(promote.startDate, promote.endDate) ===
                  "Đã kết thúc" && (
                  <p style={{ color: "red" }}>
                    <strong>
                      {getStatus(promote.startDate, promote.endDate)}
                    </strong>
                  </p>
                )}
                <img
                  onClick={() => removePromote(promote._id)}
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
