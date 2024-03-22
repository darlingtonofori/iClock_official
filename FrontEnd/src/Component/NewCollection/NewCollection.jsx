import React, { useState, useEffect, forwardRef } from "react";
import "./NewCollection.css";
import Item from "../Item/Item";
import { Route } from "react-router-dom";

const NewCollection = forwardRef((props, ref) => {
  const [new_collection, setNew_Collection] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/newcollection")
      .then((res) => res.json())
      .then((data) => setNew_Collection(data));
  }, []);

  return (
    <div className="new-collections" ref={ref}>
      <h1>Bộ sưu tập mới</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
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
});

export default NewCollection;
