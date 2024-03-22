import React, { useEffect, useState } from "react";
import "./Review.css";
import StarRating from "../StarRating/StarRating";
import moment from "moment";

const Review = (props) => {
  const { product } = props;
  // Initialize state for form input fields
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(1);
  const [reviewContent, setReviewContent] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchProductReviews();
  }, [product]);

  const fetchProductReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/productReviews/${product._id}`
      );
      const data = await response.json();
      if (data.success) {
        setReviews(data.reviews);
      } else {
        console.error("Failed to fetch product reviews");
      }
    } catch (error) {
      console.error("Error fetching product reviews:", error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      if (localStorage.getItem("auth-token")) {
        // Send a POST request to addReview endpoint with review data using fetch
        const productId = product._id;
        const response = await fetch(
          `http://localhost:4000/addReview/${productId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": `${localStorage.getItem("auth-token")}`,
            },
            body: JSON.stringify({
              customerName,
              email,
              rating,
              reviewContent,
            }),
          }
        );

        // Parse response data as JSON
        const data = await response.json();

        // If review is added successfully, show success message
        if (data.success) {
          alert("Đánh giá đã được thêm!");
          // Clear form input fields after successful submission
          setCustomerName("");
          setEmail("");
          setRating(1);
          setReviewContent("");
        } else {
          // If adding review fails, show error message
          alert("Đã có lỗi xảy ra. Vui lòng thử lại sau!");
        }
      } else {
        alert("Vui lòng đăng nhập để có thể thêm đánh giá!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Đã có lỗi xảy ra. Vui lòng thử lại sau!");
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/deletereview/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        fetchProductReviews();
        alert("Đánh giá đã được xoá");
      } else {
        alert("Đã có lỗi xảy ra! Vui lòng thử lại sau");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Đã có lỗi xảy ra. Vui lòng thử lại sau!");
    }
  };

  const timeSincePosted = (timestamp) => {
    const currentTime = moment();
    const postTime = moment.utc(timestamp);
    const duration = moment.duration(currentTime.diff(postTime));
    const seconds = duration.asSeconds();
    const minutes = duration.asMinutes();
    const hours = duration.asHours();
    const days = duration.asDays();
    const months = duration.asMonths();
    const years = duration.asYears();

    if (seconds < 60) {
      return `${Math.floor(seconds)} giây trước`;
    } else if (minutes < 60) {
      return `${Math.floor(minutes)} phút trước`;
    } else if (hours < 24) {
      return `${Math.floor(hours)} giờ trước`;
    } else if (days < 30) {
      return `${Math.floor(days)} ngày trước`;
    } else if (months < 12) {
      return `${Math.floor(months)} tháng trước`;
    } else {
      return `${Math.floor(years)} năm trước`;
    }
  };

  return (
    <div className="review">
      <div className="review-nav">
        <div className="review-nav-container fade">Đánh giá</div>
      </div>
      <div className="review-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="customerName">Tên khách hàng:</label>
            <div className="input_container">
              <input
                type="text"
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <div className="input_container">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Điểm đánh giá:</label>
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>
          <div className="form-group">
            <label htmlFor="reviewContent">Nội dung đánh giá:</label>
            <div className="input_container">
              <textarea
                id="reviewContent"
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
          <button type="submit">Gửi đánh giá</button>
        </form>
        <div className="review-list">
          <h2>Đánh giá sản phẩm</h2>
          <div>
            <ul>
              {reviews.map((review) => (
                <div className="content_review" key={review._id}>
                  <p>
                    Tên khách hàng: <strong>{review.customerName}</strong>
                  </p>
                  {/* <p>
                    Email: <strong>{review.email}</strong>
                  </p> */}
                  <p>
                    Điểm đánh giá:{" "}
                    {[...Array(review.rating)].map((_, index) => (
                      <span className="star" key={index}>
                        &#9733;
                      </span>
                    ))}
                  </p>
                  <p>
                    Nội dung đánh giá: <strong>{review.reviewContent}</strong>
                  </p>
                  <p>
                    Thời gian đánh giá:{" "}
                    <strong>
                      {moment(review.timestamps).format("HH:mm DD/MM/YYYY")}
                      {"  "}
                      <em className="italic">
                        ({timeSincePosted(review.timestamps)})
                      </em>
                    </strong>
                  </p>
                  {localStorage.getItem("auth-token") &&
                    localStorage.getItem("email") === review.email && (
                      <button
                        className="delete_btn"
                        onClick={() => handleDelete(review._id)}
                      >
                        x
                      </button>
                    )}
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
