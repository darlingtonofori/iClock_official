import React from "react";
import "./StarRating.css";

const StarRating = ({ rating, onRatingChange }) => {
  const handleClick = (value) => {
    // Gọi hàm onRatingChange để cập nhật rating mới
    onRatingChange(value);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={value <= rating ? "fa-solid1" : "fa-regular1"}
          onClick={() => handleClick(value)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
