import React from "react";
import "./Member.css";

const Member = () => {
  return (
    <div className="eula-container">
      <h1>Thông tin thành viên nhóm</h1>
      <p>
        Trong quá trình học tập, nổ lực và cố gắng hoàn thành đúng tiến độ, thì
        nay đề tài Niên luận đã dần được hoàn thiện với những chức năng và yêu
        cầu cần thiết. Cảm ơn sự giúp đỡ từ cô <strong>Võ Huỳnh Trâm</strong> đã
        góp phần vào sự thành công chung của nhóm chúng em. Cảm ơn các bạn học
        chung, các cộng tác đã giúp đỡ nhóm chúng em hoàn thành tốt đề tài này.
      </p>
      <p>Dưới đây là tổng quan về trang web của chúng tôi:</p>
      <p>
        <strong>1. Mục tiêu dự án</strong>
      </p>
      <p>
        - Xây dựng một trang web thương mại điện tử chuyên về bán các sản phẩm
        đồng hồ từ nhiều thương hiệu uy tín trên thị trường. Mục tiêu của dự án
        là tạo ra một trải nghiệm mua sắm trực tuyến thuận tiện và đáng tin cậy
        cho người dùng, cung cấp đa dạng các lựa chọn sản phẩm, từ các loại đồng
        hồ thời trang đến đồng hồ chức năng và thông minh.
      </p>
      <p>
        <strong>2. Tính năng chi tiết</strong>
      </p>
      <p>
        <strong>2.1 Hiển thị sản phẩm</strong>
      </p>
      <p>
        - Hiển thị danh sách sản phẩm đồng hồ với hình ảnh, giá cả, mô tả và
        đánh giá từ người dùng
      </p>
      <p>
        - Cho phép người dùng xem chi tiết sản phẩm, bao gồm thông tin kỹ thuật,
        đánh giá.
      </p>
      <p>
        <strong>2.2 Tìm kiếm và lọc sản phẩm</strong>
      </p>
      <p>
        - Cung cấp chức năng tìm kiếm nâng cao để người dùng có thể tìm kiếm sản
        phẩm theo thương hiệu
      </p>
      <p>
        - Cho phép người dùng lọc sản phẩm theo các tiêu chí như giá từ cao đến
        thấp
      </p>
      <p>
        <strong>2.3 Quản lý giỏ hàng</strong>
      </p>
      <p>
        - Cho phép người dùng thêm sản phẩm vào giỏ hàng, chỉnh sửa số lượng và
        xóa sản phẩm khỏi giỏ hàng.
      </p>
      <p>- Tính toán tổng giá trị của đơn hàng và hiển thị tổng cộng</p>
      <p>
        <strong>2.4 Quản lý tài khoản</strong>
      </p>
      <p>
        - Cho phép người dùng đăng ký tài khoản mới hoặc đăng nhập bằng tài
        khoản đã tồn tại
      </p>
      <p>
        - Cung cấp giao diện quản lý tài khoản để người dùng có thể cập nhật
        thông tin cá nhân, xem lịch sử mua hàng và quản lý địa chỉ giao hàng.
      </p>
      <p>
        <strong>3. Công nghệ sử dụng</strong>
      </p>
      <p>
        - Frontend: Sử dụng ReactJS để xây dựng giao diện người dùng đáng tin
        cậy và dễ sử dụng.
      </p>
      <p>
        - Backend: Sử dụng Node.js và Express.js để xử lý logic backend, xây
        dựng API và quản lý tương tác với cơ sở dữ liệu.
      </p>
      <p>
        - Cơ sở dữ liệu: Sử dụng MongoDB để lưu trữ thông tin sản phẩm, thông
        tin người dùng và lịch sử giao dịch.
      </p>
      <p>
        - Thanh toán: Integrate các cổng thanh toán như PayPal, Stripe để đảm
        bảo giao dịch an toàn và thuận tiện.
      </p>
      <p>
        <strong>4. Thành viên nhóm</strong>
      </p>
      <p>- Kiều Tấn Quốc - B20121328</p>
      <p>- Nguyễn Văn Kiệt - B2003838</p>
      <p>- Nguyễn Đức Thịnh - B2012146</p>
    </div>
  );
};

export default Member;
