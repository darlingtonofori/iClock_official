import { useState } from "react";
import "./Info.css";
const Info = () => {
  const [strapName, setStrapName] = useState("");
  const [faceName, setFaceName] = useState("");
  const [PinName, setPinName] = useState("");
  const [PinPower, setPinPower] = useState("");
  const [CaseName, setCaseName] = useState("");
  const [BrandName, setBrandName] = useState("");
  const handleStrapName = (e) => {
    setStrapName(e.target.value);
  };
  const handleFaceName = (e) => {
    setFaceName(e.target.value);
  };
  const handlePinName = (e) => {
    setPinName(e.target.value);
  };
  const handlePinPower = (e) => {
    setPinPower(e.target.value);
  };
  const handleCaseName = (e) => {
    setCaseName(e.target.value);
  };
  const handleBrandName = (e) => {
    setBrandName(e.target.value);
  };
  const Add_Strap = async () => {
    await fetch("http://localhost:4000/addstraps", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: strapName }),
    });
  };
  const Add_Face = async () => {
    await fetch("http://localhost:4000/addfaces", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: faceName }),
    });
  };
  const Add_Pin = async () => {
    await fetch("http://localhost:4000/addpin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ power: PinPower, name: PinName }),
    });
  };
  const Add_Case = async () => {
    await fetch("http://localhost:4000/addwatchcase", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: CaseName }),
    });
  };
  const Add_Brand = async () => {
    await fetch("http://localhost:4000/addbrand", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: BrandName }),
    });
  };
  return (
    <div className="all-Add">
      <h1>Thêm thông số sản phẩm</h1>
      <div className="addproduct-item-input">
        <p>Loại dây đồng hồ</p>
        <div className="propertie-item">
          <input
            value={strapName}
            onChange={handleStrapName}
            type="text"
            name="straps"
            placeholder="Nhập vào đây"
          />
          <button onClick={() => Add_Strap()}>Thêm dây</button>
        </div>
      </div>

      <div className="addproduct-item-input">
        <p>Loại Mặt đồng hồ</p>
        <div className="propertie-item">
          <input
            value={faceName}
            onChange={handleFaceName}
            type="text"
            name="faces"
            placeholder="Nhập vào đây"
          />
          <button onClick={() => Add_Face()}>Thêm Mặt</button>
        </div>
      </div>
      <div className="addproduct-item-input">
        <p>Loại Pin đồng hồ</p>
        <div className="propertie-item">
          <input
            className="pin-items"
            value={PinPower}
            onChange={handlePinPower}
            type="text"
            name="pinsPower"
            placeholder="Nhập vào dung lượng PIN"
          />
          <input
            className="pin-items"
            value={PinName}
            onChange={handlePinName}
            type="text"
            name="pinsName"
            placeholder="Nhập vào tên PIN"
          />
          <button onClick={() => Add_Pin()}>Thêm Pin</button>
        </div>
      </div>
      <div className="addproduct-item-input">
        <p>Loại Vỏ đồng hồ</p>
        <div className="propertie-item">
          <input
            value={CaseName}
            onChange={handleCaseName}
            type="text"
            name="cases"
            placeholder="Nhập vào đây"
          />
          <button onClick={() => Add_Case()}>Thêm Vỏ</button>
        </div>
      </div>
      <div className="addproduct-item-input">
        <p>Loại Hiệu đồng hồ</p>
        <div className="propertie-item">
          <input
            value={BrandName}
            onChange={handleBrandName}
            type="text"
            name="brands"
            placeholder="Nhập vào đây"
          />
          <button onClick={() => Add_Brand()}>Thêm Hiệu</button>
        </div>
      </div>
    </div>
  );
};

export default Info;
