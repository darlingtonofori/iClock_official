import React, { useRef } from "react";
import Hero from "../Component/Hero/Hero";
import Popular from "../Component/Popular/Popular";
import Offer from "../Component/Offers/Offer";
import NewCollection from "../Component/NewCollection/NewCollection";
import NewsLetter from "../Component/NewsLetter/NewsLetter";

const Shop = () => {
  const collectionRef = useRef(null);
  return (
    <div>
      <Hero collectionRef={collectionRef}></Hero>
      <Popular></Popular>
      {/* <Offer></Offer> */}
      <NewCollection ref={collectionRef}></NewCollection>
      <NewsLetter></NewsLetter>
    </div>
  );
};

export default Shop;
