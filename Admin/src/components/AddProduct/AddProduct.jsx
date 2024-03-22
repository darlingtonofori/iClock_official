import { useEffect, useState } from "react";
import "./AddProduct.css";
import upload from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "Phái đẹp",
    new_price: "",
    old_price: "",
    description: "",
    straps: "",
    face: "",
    pins: "",
    cases: "",
    brands: "",
    description_detail: "",
    quantity: 0,
  });
  const [straps, setStraps] = useState([]);
  const [faces, setFaces] = useState([]);
  const [pins, setPins] = useState([]);
  const [cases, setCases] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedStraps, setSelectedStraps] = useState([]);
  const [selectedFaces, setSelectedFaces] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/allstraps")
      .then((resp) => resp.json())
      .then((data) => setStraps(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/allfaces")
      .then((resp) => resp.json())
      .then((data) => setFaces(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/allpin")
      .then((resp) => resp.json())
      .then((data) => setPins(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:4000/allwatchcase")
      .then((resp) => resp.json())
      .then((data) => setCases(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:4000/allbrands")
      .then((resp) => resp.json())
      .then((data) => setBrands(data));
  }, []);
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  const changeHandlerCase = (e) => {
    setProductDetails({ ...productDetails, cases: e.target.value });
  };

  const addStrap = (strap) => {
    setSelectedStraps([...selectedStraps, strap]);
  };
  const addFace = (face) => {
    setSelectedFaces([...selectedFaces, face]);
  };
  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;
    product.straps = selectedStraps;
    product.face = selectedFaces;

    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success
            ? alert("Đã thêm sản phẩm")
            : alert("Thêm sản phẩm không thành công");
        });
    }
  };
  return (
    <div className="add-product">
      <div className="addproduct-item-input">
        <p>Tiêu đề sản phẩm</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Nhập vào đây"
        />
      </div>
      <div className="addproduct-item-input">
        <p>Số lượng: </p>
        <input
          value={productDetails.quantity}
          onChange={changeHandler}
          type="number"
          name="quantity"
          placeholder="Nhập vào đây"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-item-input">
          <p>Giá niêm yết</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Nhập vào đây"
          />
        </div>
        <div className="addproduct-item-input">
          <p>Giá khuyến mãi</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Nhập vào đây"
          />
        </div>
      </div>
      {/* <div className="addproduct-overview">
      </div> */}
      <div className="addproduct-item-input">
        <p>Loại dây đồng hồ</p>
        <select
          name="straps"
          value={productDetails.straps}
          onChange={changeHandler}
        >
          <option value="">Chọn loại dây đồng hồ</option>
          {straps.map((strap) => (
            <option key={strap._id} value={strap.name}>
              {strap.name}
            </option>
          ))}
        </select>
        <button onClick={() => addStrap(productDetails.straps)}>
          Thêm dây
        </button>
      </div>
      <div className="strap_props">
        {selectedStraps.map((strap, index) => (
          <>
            <button className="strap_props-items" key={index}>
              {strap}
            </button>
          </>
        ))}
      </div>
      <div className="addproduct-item-input">
        <p>Loại mặt đồng hồ</p>
        <select
          name="face"
          value={productDetails.face}
          onChange={changeHandler}
        >
          <option value="">Chọn loại mặt đồng hồ</option>
          {faces.map((face) => (
            <option key={face._id} value={face.name}>
              {face.name}
            </option>
          ))}
        </select>
        <button onClick={() => addFace(productDetails.face)}>
          Thêm mặt đồng hồ
        </button>
      </div>
      <div className="strap_props">
        {selectedFaces.map((face, index) => (
          <>
            <button className="strap_props-items" key={index}>
              {face}
            </button>
          </>
        ))}
      </div>
      <div className="addproduct-item-input">
        <p>Chất liệu vỏ đồng hồ</p>
        <select
          name="cases"
          value={productDetails.cases}
          onChange={changeHandlerCase}
        >
          <option value="">Chọn chất liệu vỏ</option>
          {cases.map((c) => (
            <option key={c._id} value={c.type}>
              {c.type}
            </option>
          ))}
        </select>
      </div>
      <div className="addproduct-item-input">
        <p>Hãng</p>
        <select
          name="brands"
          value={productDetails.brands}
          onChange={changeHandler}
        >
          <option value="">Chọn hãng</option>
          {brands.map((b) => (
            <option key={b._id} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>
      </div>
      <div className="addproduct-item-input">
        <p>Loại PIN</p>
        <select
          name="pins"
          value={productDetails.pins}
          onChange={changeHandler}
        >
          <option value="">Chọn loại PIN</option>
          {pins.map((pin) => (
            <option key={pin.id} value={pin.name}>
              {pin.name} - {pin.power}
            </option>
          ))}
        </select>
      </div>
      <div className="addproduct-item-input">
        <p>Mô tả sản phẩm</p>
        <textarea
          name="description"
          cols="80"
          rows="10"
          value={productDetails.description}
          onChange={changeHandler}
        ></textarea>
      </div>
      <div className="addproduct-item-input">
        <p>Mô tả chi tiết sản phẩm</p>
        <textarea
          name="description_detail"
          cols="80"
          rows="10"
          value={productDetails.description_detail}
          onChange={changeHandler}
        ></textarea>
      </div>
      <div className="addproduct-item-input">
        <p>Loại sản phẩm</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="Phái đẹp">Phái đẹp</option>
          <option value="Phái mạnh">Phái mạnh</option>
          <option value="Trẻ em">Trẻ em</option>
        </select>
      </div>
      <div className="addproduct-item-input">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload}
            alt=""
            className="addproduct-thumbnail-img"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          Add_Product();
        }}
        className="addproduct-button"
      >
        Thêm sản phẩm
      </button>
    </div>
  );
};

export default AddProduct;
