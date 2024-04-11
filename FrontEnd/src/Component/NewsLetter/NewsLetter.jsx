import React, { useState } from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  const [new_collect, setNew_Collect] = useState([]);
  return (
    <div className="newsletter">
      <h1>Bạn muốn nhận ưu đãi độc quyền?</h1>
      <p>Đăng ký nhận tin mới và được cập nhật thường xuyên</p>
      <p style={{ color: "red", fontSize: "15px", fontStyle: "italic" }}>
        (Tính năng này đang được phát triển)
      </p>
      <div>
        <input type="email" placeholder="Nhập email tại đây" />
        <button>Đăng ký</button>
      </div>
    </div>
  );
};

export default NewsLetter;
