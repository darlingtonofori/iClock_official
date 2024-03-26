import React, { useContext, useState } from "react";
import "./ShowProduct.css";
import star_icon from "../Asset/star_icon.png";
import star_dull_icon from "../Asset/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import ReactImageZoom from "react-image-zoom";

const ShowProduct = (props) => {
  const { product } = props;
  const { addToCart, updateSelectedFace, updateSelectedStrap } =
    useContext(ShopContext);
  const [selectedFace, setSelectedFace] = useState(null);
  const [selectedStrap, setSelectedStrap] = useState(null);
  const [selectedStrapIndex, setSelectedStrapIndex] = useState(null);
  const [selectedFaceIndex, setSelectedFaceIndex] = useState(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  if (!product || !product.image) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
        }}
      >
        <div>Đang tải tài nguyên...</div>
      </div>
    );
  }

  const handleFaceChange = (face) => {
    setSelectedFace(face);
    // alert(face);
    setSelectedFaceIndex(face);
    updateSelectedFace(face);
  };

  const handleStrapChange = (strap) => {
    setSelectedStrap(strap);
    // alert(strap);
    setSelectedStrapIndex(strap);
    updateSelectedStrap(strap);
  };

  const checkLogin = () => {
    let login = localStorage.getItem("auth-token");
    if (!login) {
      alert("Bạn cần đăng nhập trước khi thêm sản phẩm vào giỏ hàng!");
    } else if (!selectedFace || !selectedStrap) {
      alert("Vui lòng chọn loại dây và mặt trước khi thêm vào giỏ hàng!");
    } else {
      // alert(`${selectedFace} - ${selectedStrap}`);
      addToCart(product.id, selectedFace, selectedStrap);
      alert("Đã thêm vào giỏ hàng!");
    }
  };

  const handleMouseMove = (e) => {
    // Get coordinates of mouse pointer
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { width, height } = target.getBoundingClientRect();

    // Calculate the position relative to the image
    const xPercentage = (offsetX / width) * 100;
    const yPercentage = (offsetY / height) * 100;

    // Calculate zoom position based on mouse pointer
    const zoomPosition = {
      x: xPercentage,
      y: yPercentage,
    };

    // Set the zoom position
    setZoomPosition(zoomPosition);
  };

  return (
    <div className="showProduct">
      <div className="showProduct-left">
        <ReactImageZoom
          img={product.image}
          width={400}
          height={400}
          scale={0.9}
          zoomWidth={200}
          pan={false} // Disable default panning
          zoomPosition={zoomPosition}
          onMouseMove={handleMouseMove}
        />
      </div>
      <div className="showProduct-right">
        <h1>{product.name}</h1>
        <div className="showProduct-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="showProduct-right-prices">
          <div className="showProduct-right-price-old">
            {product.old_price} ₫
          </div>
          <div className="showProduct-right-price_new">
            {product.new_price} ₫
          </div>
        </div>
        <div className="showProduct-right-des">{product.description}</div>
        <div className="showProduct-right-size">
          <h1>Chọn loại dây: </h1>
          <div className="showProduct-right-sizes">
            {product.straps.map((strap, index) => (
              <div
                key={index}
                onClick={() => handleStrapChange(strap)}
                style={{
                  border:
                    selectedStrapIndex === strap ? "2px solid #41a0ff" : "none",
                  borderRadius: "15px",
                }}
              >
                {strap}{" "}
                {selectedStrap === strap && (
                  <i
                    className="fa-solid fa-check"
                    style={{
                      marginLeft: "10px",
                      color: "white",
                      backgroundColor: "green",
                      borderRadius: "50%",
                      padding: "2px",
                    }}
                  ></i>
                )}
              </div>
            ))}
          </div>
          <div className="showProduct-right-size">
            <h1>Chọn loại mặt: </h1>
            <div className="showProduct-right-sizes">
              {product.face.map((face, index) => (
                <div
                  key={index}
                  onClick={() => handleFaceChange(face)}
                  style={{
                    border:
                      selectedFaceIndex === face ? "2px solid #41a0ff" : "none",
                    borderRadius: "15px",
                  }}
                >
                  {face}{" "}
                  {selectedFace === face && (
                    <i
                      className="fa-solid fa-check"
                      style={{
                        marginLeft: "10px",
                        color: "white",
                        backgroundColor: "green",
                        borderRadius: "50%",
                        padding: "2px",
                      }}
                    ></i>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            checkLogin();
          }}
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ShowProduct;
