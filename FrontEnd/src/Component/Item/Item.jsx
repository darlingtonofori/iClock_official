import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
const Item = (props) => {
  let showNew_Price = props.new_price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  let showOld_Price = props.old_price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (
    <div className="item" title={props.name}>
      <Link to={`/product/${props.id}`}>
        <img onClick={window.scrollTo(0, 0)} src={props.image} alt="" />
      </Link>
      <p className="text-truncate">{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">{showNew_Price}đ</div>
        <div className="item-price-old">{showOld_Price}đ</div>
      </div>
    </div>
  );
};

export default Item;
