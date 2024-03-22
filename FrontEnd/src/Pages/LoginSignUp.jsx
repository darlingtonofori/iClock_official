import React, { useState, useEffect } from "react";
import "./CSS/loginSignup.css";

const LoginSignUp = () => {
  const [state, setState] = useState("Đăng nhập");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [formResetPassword, setFormResetPassword] = useState({
    otp: "",
    email: `${formData.email}`,
    newPassword: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changeResetPasswordHandler = (e) => {
    setFormResetPassword({
      ...formResetPassword,
      [e.target.name]: e.target.value,
    });
  };

  const login = async () => {
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      localStorage.setItem("email", responseData.email);
      localStorage.setItem("jsl", responseData.id);
      if (responseData.role === "Quản trị viên") {
        const confirmation = window.confirm(
          "Bạn được xác định là quản trị viên. Mặc định bạn sẽ ở trang mua sắm. Bạn có muốn điều hướng đến trang quản trị không?"
        );
        if (confirmation) {
          window.open("http://localhost:5173", "_blank");
        } else {
          window.location.replace("/");
        }
      } else {
        window.location.replace("/");
      }
    } else {
      alert(responseData.errors);
    }
  };
  const signup = async () => {
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/login");
    } else {
      alert(responseData.errors);
    }
  };

  const forgotPassword = async () => {
    const rsp = await fetch("http://localhost:4000/users", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const users = await rsp.json();
    const existingAccount = users.find((user) => user.email === formData.email);

    if (!existingAccount) {
      alert("Email không tồn tại trong hệ thống");
      return;
    }
    const rspOTP = await fetch("http://localhost:4000/forgotpassword", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: formData.email }),
    });
    const data = await rspOTP.json();
    setState("Nhập mã OTP");
    setFormResetPassword({ ...formResetPassword, email: formData.email });
    alert(data.message);
  };

  const resetPassword = async () => {
    const rsp = await fetch("http://localhost:4000/resetpassword", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp: formResetPassword.otp,
        newPassword: formResetPassword.newPassword,
        email: formResetPassword.email,
      }),
    });
    const data = await rsp.json();
    if (data.success) {
      alert(data.message);
      // Sau khi cập nhật mật khẩu, chuyển về trang đăng nhập
      // After resetting password, delete OTP
      await fetch("http://localhost:4000/deleteotp", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formResetPassword.email,
        }),
      });
      setState("Đăng nhập");
    } else {
      alert(data.errors);
    }
  };
  return (
    <div className="loginSignup">
      <div className="loginSignup-container">
        <h1>{state}</h1>
        <div className="loginSignup-fields">
          {state === "Đăng ký tài khoản" && state !== "Quên mật khẩu" ? (
            <input
              onChange={changeHandler}
              name="username"
              value={formData.username}
              type="text"
              placeholder="Tên của bạn"
            />
          ) : (
            <></>
          )}
          {state !== "Quên mật khẩu" && state !== "Nhập mã OTP" ? (
            <>
              <input
                name="email"
                value={FormData.email}
                onChange={changeHandler}
                type="text"
                placeholder="Địa chỉ email"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                id=""
                placeholder="Mật khẩu"
              />
            </>
          ) : (
            <></>
          )}
          {state === "Quên mật khẩu" ? (
            <>
              <input
                name="email"
                value={formData.email}
                onChange={changeHandler}
                type="text"
                placeholder="Địa chỉ email"
              />
            </>
          ) : (
            <></>
          )}
        </div>
        {state === "Quên mật khẩu" ? (
          <button onClick={forgotPassword}>Gửi mã xác nhận</button>
        ) : (
          <></>
        )}
        {state === "Đăng ký tài khoản" ? (
          <>
            <button
              onClick={() => {
                state === "Đăng nhập" ? login() : signup();
              }}
            >
              Tiếp tục
            </button>
            <p className="loginSignup-login">
              Bạn đã có tài khoản?{" "}
              <span
                onClick={() => {
                  setState("Đăng nhập");
                }}
              >
                Đăng nhập tại đây!
              </span>
            </p>
          </>
        ) : (
          <></>
        )}
        {state === "Đăng nhập" ? (
          <>
            <button
              onClick={() => {
                state === "Đăng nhập" ? login() : signup();
              }}
            >
              Tiếp tục
            </button>
            <p className="loginSignup-login">
              Bạn chưa có tài khoản?{" "}
              <span
                onClick={() => {
                  setState("Đăng ký tài khoản");
                }}
              >
                Tạo tài khoản tại đây!
              </span>
            </p>
          </>
        ) : (
          <></>
        )}
        {state === "Đăng nhập" ? (
          <>
            <p className="loginSignup-login">
              Bạn quên mật khẩu?{" "}
              <span
                onClick={() => {
                  setState("Quên mật khẩu");
                }}
              >
                Đặt mật khẩu mới tại đây
              </span>
            </p>
          </>
        ) : (
          <></>
        )}
        <div className="loginSignup-fields">
          {state === "Nhập mã OTP" && state !== "Quên mật khẩu" ? (
            <>
              <input
                onChange={changeResetPasswordHandler}
                name="otp"
                value={formResetPassword.otp}
                type="text"
                placeholder="Mã OTP"
              />
              <input
                onChange={changeResetPasswordHandler}
                name="newPassword"
                value={formResetPassword.newPassword}
                type="password"
                placeholder="Mật khẩu mới"
              />
              <button onClick={resetPassword}>Đổi mật khẩu</button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
