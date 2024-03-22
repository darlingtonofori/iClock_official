import React, { useContext, useEffect, useState } from "react";
import "./CSS/category.css";
import { ShopContext } from "../Context/ShopContext";
import dropdownicon from "../Component/Asset/dropdown_icon.png";
import Item from "../Component/Item/Item";

const ShopCategory = (props) => {
  const { all_product, toggleSortByPriceDescending } = useContext(ShopContext);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [noProductFound, setNoProductFound] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  // const [minPrice, setMinPrice] = useState(100);
  // const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    fetchBrand();
  }, []);

  const fetchBrand = async () => {
    try {
      const response = await fetch("http://localhost:4000/allbrands");
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const handleSortByPrice = () => {
    toggleSortByPriceDescending();
  };

  const handleBrandChange = (event) => {
    const selectedBrandValue = event.target.value;
    setSelectedBrand(selectedBrandValue);
    const productsForSelectedBrand = all_product.filter(
      (product) => product.brands === selectedBrandValue
    );
  };

  const handleSearchChange = (e) => {
    setSearchKey(e.target.value);
  };

  // const handleMinPriceChange = (e) => {
  //   setMinPrice(parseInt(e.target.value));
  // };

  // const handleMaxPriceChange = (e) => {
  //   setMaxPrice(parseInt(e.target.value));
  // };
  return (
    <div className="category">
      {/* <img className="category-banner" src={props.banner} alt="" /> */}
      <div className="sidebar">
        <div>
          <input onClick={handleSortByPrice} type="checkbox" name="" id=" " />
          <span>Theo giá từ cao đến thấp</span>
        </div>
        <hr />
        {/* <div>
          <input type="checkbox" name="" id=" " />
          <span>Theo hãng A-Z</span>
        </div>
        <div>
          <input type="checkbox" name="" id=" " />
          <span>Theo hãng Z-A</span>
        </div>
        <input type="checkbox" name="" id=" " />
        <span>Theo chất liệu</span> */}
        <div className="filter-brand">
          <p>Lọc sản phẩm theo nhãn hàng</p>
          {/* Sử dụng select option thay vì checkbox */}
          <select
            className="brand-list"
            value={selectedBrand}
            onChange={handleBrandChange}
          >
            <option value="">Chọn nhãn hàng</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
        <div className="search-container">
          <input
            className="input_product"
            type="text"
            value={searchKey}
            onChange={handleSearchChange}
            placeholder="Tìm kiếm sản phẩm"
          />
        </div>
        {/* <div className="price-filter">
          <p>Lọc sản phẩm theo giá</p>
          <div>
            <input
              type="range"
              min={100}
              max={1000} // Thay đổi giới hạn giá trị tùy thuộc vào giá trị tối đa của sản phẩm
              value={minPrice}
              onChange={handleMinPriceChange}
            />
            <input
              type="range"
              min={100}
              max={1000} // Thay đổi giới hạn giá trị tùy thuộc vào giá trị tối đa của sản phẩm
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
          <div>
            <span>Giá tối thiểu: {minPrice}</span>
            <span>Giá tối đa: {maxPrice}</span>
          </div>
        </div> */}
      </div>
      <div className="category-product">
        {all_product
          .filter(
            (item) =>
              (selectedBrand.length === 0 ||
                selectedBrand.includes(item.brands)) &&
              (searchKey.trim() === "" ||
                item.name.toLowerCase().includes(searchKey.toLowerCase()))
          )
          .map((item, i) => {
            const isMatched = item.name
              .toLowerCase()
              .includes(searchKey.toLowerCase());
            if (
              props.category === item.category &&
              (selectedBrand.length === 0 ||
                (selectedBrand.includes(item.brands) && isMatched))
            ) {
              return (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                ></Item>
              );
            }
          })}
        {all_product.filter(
          (item) =>
            (selectedBrand.length === 0 ||
              selectedBrand.includes(item.brands)) &&
            (searchKey.trim() === "" ||
              item.name.toLowerCase().includes(searchKey.toLowerCase()))
        ).length === 0 && <p>Không có sản phẩm</p>}
      </div>
    </div>
  );
};

export default ShopCategory;
