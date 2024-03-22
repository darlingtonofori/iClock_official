import React, { useContext } from "react";
import "./RelatedProducts.css";
import data_product from "../Asset/popular";
import Item from "../Item/Item";

const RelatedProducts = () => {
  return (
    <div className="relatedProducts">
      <h1>Sản phẩm liên quan</h1>
      <hr />
      <div className="relatedProduct-items">
        {data_product.map((item, i) => {
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
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
