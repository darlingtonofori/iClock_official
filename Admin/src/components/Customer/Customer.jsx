import { useEffect, useState } from "react";
import "./Customer.css";
import remove_icon from "../../assets/cross_icon.png";
import edit_icon from "../../assets/681286-200.png";

const Customer = () => {
  const [users, setAllUser] = useState([]);
  const [passwords, setPasswords] = useState("");
  const [role, setRole] = useState({
    name: "",
  });

  const [name, setName] = useState([]);
  const [userRoles, setUserRoles] = useState({});

  const fetchInfor = async () => {
    await fetch("http://localhost:4000/users")
      .then((res) => res.json())
      .then((data) => {
        setAllUser(data);
        const roles = {};
        data.forEach((user) => {
          roles[user._id] = user.role;
        });
        setUserRoles(roles);
      });
  };

  const fetchRole = async () => {
    await fetch("http://localhost:4000/showRole")
      .then((res) => res.json())
      .then((data) => setName(data));
  };

  useEffect(() => {
    fetchInfor();
    fetchRole();
  }, []);

  const changeHandler = (e) => {
    setRole({ ...role, [e.target.name]: e.target.value });
  };

  const changeRole = async (userId, newRole) => {
    try {
      await fetch(`http://localhost:4000/changeUserRole/${userId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });
      await fetchInfor();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeUser = async (_id) => {
    await fetch(`http://localhost:4000/deleteUser/${_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: _id }),
    });
    await fetchInfor();
  };

  const changePassword = async (_id) => {
    if (!passwords[_id]?.new) {
      alert("Vui lòng nhập đầy đủ thông tin mật khẩu");
      return;
    }
    const rsp = await fetch(`http://localhost:4000/changepassword/${_id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newPassword: passwords[_id].new,
        _id,
      }),
    });
    const data = await rsp.json();

    // Kiểm tra mật khẩu cũ đúng
    if (!data.success) {
      alert(data.errors);
      return;
    } else {
      alert(data.message);
    }
    await fetchInfor();
  };

  return (
    <div className="list-user">
      <h1>Danh sách người dùng</h1>
      <div className="responsibility-warning">
        <p className="warning-message">
          <b style={{ fontSize: "16px" }}>Lưu ý:</b> Bạn đang truy cập vào một
          phần quan trọng của hệ thống - quản lý và thay đổi mật khẩu người
          dùng. Việc truy cập này đòi hỏi sự cẩn thận và trách nhiệm cao. Bằng
          việc đổi mật khẩu của người dùng, bạn đảm bảo rằng thông tin cá nhân
          của họ được bảo vệ an toàn và tuân thủ các quy định bảo mật và quyền
          riêng tư cũng như đã được liên hệ uỷ quyền bởi người dùng chính thức.
          Vui lòng nhớ rằng việc sử dụng hoặc tiết lộ mật khẩu của người dùng
          một cách không đúng cách có thể gây ra hậu quả nghiêm trọng và vi phạm
          quy định về bảo mật thông tin cá nhân. Hãy đảm bảo rằng bạn chỉ sử
          dụng quyền truy cập này với mục đích công việc và không sử dụng thông
          tin cá nhân của người dùng cho bất kỳ mục đích nào khác.
        </p>
      </div>
      <div className="list_user-main">
        {/* <p>Mã định danh</p> */}
        <p>Tên người dùng</p>
        <p>Email</p>
        {/* <p>Mật khẩu</p> */}
        <p>Vai trò người dùng</p>
        <p>Mật khẩu mới</p>
        <p>Đổi mật khẩu</p>
        <p>Xoá người dùng</p>
      </div>
      <div className="list_user-allusers">
        <hr />
        {users.map((user, i) => {
          return (
            <>
              <div key={i} className="list_user-main list_user-format">
                {/* <img src={product.image} alt="" className="list_product-icon" /> */}
                <p>{user.name}</p>
                <p>{user.email}</p>
                <select
                  name=""
                  value={userRoles[user._id]}
                  onChange={(e) => {
                    changeHandler(e);
                    changeRole(user._id, e.target.value);
                  }}
                >
                  <option value="">Chọn nhóm người dùng</option>
                  {name.map((n) => (
                    <option key={n.id} value={n.name}>
                      {n.name}
                    </option>
                  ))}
                </select>
                <input
                  type="password"
                  value={passwords[user._id]?.new || ""}
                  onChange={(e) =>
                    setPasswords((prevPassword) => ({
                      ...prevPassword,
                      [user._id]: {
                        ...prevPassword[user._id],
                        new: e.target.value,
                      },
                    }))
                  }
                />
                {/* <button onClick={() => changePassword(user._id)}>
                  Đổi mật khẩu
                </button> */}
                <img
                  className="list_product-remove-icon"
                  onClick={() => {
                    changePassword(user._id);
                  }}
                  src={edit_icon}
                  alt=""
                />
                <img
                  onClick={() => {
                    removeUser(user._id);
                  }}
                  className="list_product-remove-icon"
                  src={remove_icon}
                  alt=""
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Customer;
