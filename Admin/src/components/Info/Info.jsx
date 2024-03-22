import { useState } from "react";

const Info = () => {
  const [strapName, setStrapName] = useState("");
  const handleStrapName = (e) => {
    setStrapName(e.target.value);
  };
  const Add_Strap = async () => {
    console.log(strapName);
    await fetch("http://localhost:4000/addstraps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: strapName }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        data.success
          ? alert("Đã thêm dây")
          : alert("Thêm dây không thành công");
      });
  };
  return (
    <div className="addproduct-item-input">
      <p>Loại dây đồng hồ</p>
      <input
        value={strapName}
        onChange={handleStrapName}
        type="text"
        name="straps"
        placeholder="Nhập vào đây"
      />
      <button onClick={() => Add_Strap()}>Thêm dây</button>
    </div>
  );
};

export default Info;
