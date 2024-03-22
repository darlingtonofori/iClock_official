import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Breadcrum from "../Component/Breadcrums/Breadcrum";
import { ShopContext } from "../Context/ShopContext";
import ShowProduct from "../Component/ShowProduct/ShowProduct";
import Description from "../Component/Description/Description";
import RelatedProducts from "../Component/RelatedProduct/RelatedProducts";
import Review from "../Component/Review/Review";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));

  if (!product || !product.image) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center", // căn giữa theo chiều ngang
          alignItems: "center", // căn giữa theo chiều dọc
          height: "100px", // chiều cao của viewport
        }}
      >
        <div>Đang tải tài nguyên...</div>
      </div>
    );
  }
  return (
    <div>
      <Breadcrum product={product}></Breadcrum>
      <ShowProduct product={product}></ShowProduct>
      <Description product={product}></Description>
      <Review product={product}></Review>
      {/* <RelatedProducts></RelatedProducts> */}
    </div>
  );
};

export default Product;
