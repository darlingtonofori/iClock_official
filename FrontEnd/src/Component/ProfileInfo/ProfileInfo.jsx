import React, { useState, useEffect } from "react";
import "./ProfileInfo.css";

const ProfileInfo = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLogin, setLogin] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistricts, setSelectedDistricts] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [address, setAddress] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [mailInput, setMailInput] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [editName, setEditName] = useState(false);
  const [editMail, setEditMail] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [changePasswordClicked, setChangePasswordClicked] = useState(false);
  const [changeAddressdMode, setChangeAddressMode] = useState(false);
  const [isChangeAddress, setIsChangeAddress] = useState(false);

  useEffect(() => {
    fetchProvinces();
    fetchUserData();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await fetch("http://localhost:4000/provinces");
      if (!response.ok) {
        throw new Error(
          "Đã có lỗi trong quá trình tải danh sách tỉnh/thành phố"
        );
      }
      const data = await response.json();
      setProvinces(data);
    } catch (error) {
      console.log(
        "Đã có lỗi trong quá trình tải danh sách tỉnh/thành phố",
        error.message
      );
    }
  };

  const fetchDistricts = async (provinceName) => {
    try {
      const resp = await fetch(
        `http://localhost:4000/districts/${provinceName}`
      );
      if (!resp.ok) {
        throw new Error("Đã có lỗi trong quá trình tải danh sách quận/huyện");
      }
      const data = await resp.json();
      setDistricts(data);
    } catch (error) {
      console.log("Đã có lỗi trong quá trình tải danh sách quận/huyện");
    }
  };

  const fetchWards = async (provinceName, districtsName) => {
    try {
      const resp = await fetch(
        `http://localhost:4000/wards/${provinceName}/${districtsName}`
      );
      if (!resp.ok) {
        throw new Error("Đã có lỗi trong quá trình tải danh sách phường/xã");
      }
      const data = await resp.json();
      setWards(data);
    } catch (error) {
      console.log("Đã có lỗi trong quá trình tải danh sách phường/xã");
    }
  };

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setSelectedProvince(selectedProvince);
    setSelectedDistricts("");
    fetchDistricts(selectedProvince);
  };

  const handleDistrictChange = (e) => {
    const selectedDistricts = e.target.value;
    setSelectedDistricts(selectedDistricts);
    fetchWards(selectedProvince, selectedDistricts);
  };

  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      if (token) {
        setLogin(true);
      } else {
        setLogin(false);
      }
      const email = localStorage.getItem("email");
      const resp = await fetch(`http://localhost:4000/profile/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!resp) {
        setLogin(false);
        throw new Error(`Lỗi: ${response.status} - ${response.statusText}`);
      }
      const userData = await resp.json();
      setUserData(userData.user);
      if (userData.user.address) {
        const addressParts = userData.user.address.split(", ");
        setAddress(addressParts[0]);
        setSelectedWard(addressParts[1]);
        setSelectedDistricts(addressParts[2]);

        // Lấy tên tỉnh/thành phố bằng cách lấy phần còn lại của chuỗi sau khi loại bỏ phần đã lấy trước đó
        const provinceAndRest = addressParts.slice(3).join(", ");
        setSelectedProvince(provinceAndRest);
      }
      setNameInput(userData.user.name);
      setMailInput(userData.user.email);
      setNumberPhone(userData.user.numberPhone);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setLogin(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleNameChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleMailChange = (e) => {
    setMailInput(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setNumberPhone(e.target.value);
  };

  const toggleEditName = () => {
    setEditName(!editName);
  };

  const toggleEditMail = () => {
    setEditMail(!editMail);
  };

  const toggleChangePassword = () => {
    setIsChangePassword(!isChangePassword);
    setChangePasswordMode(!changePasswordMode);
    setChangePasswordClicked(true);
  };

  const toggleChangeAddress = () => {
    setIsChangeAddress(!isChangeAddress);
    setChangePasswordMode(!changeAddressdMode);
  };

  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const updateUserInfo = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const email = localStorage.getItem("email");
      const fullAddress = `${address}, ${selectedWard}, ${selectedDistricts}, ${selectedProvince}`;
      const response = await fetch(
        `http://localhost:4000/update-profile/${email}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: nameInput,
            email: mailInput,
            address: fullAddress,
            numberPhone: numberPhone,
          }),
        }
      );
      if (isChangePassword) {
        changeUserPassword(localStorage.getItem("jsl"));
        alert("Thông tin đã được cập nhật!");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error updating user info:", error.message);
    }
  };
  const changeUserPassword = async (_id) => {
    if (changePasswordClicked) {
      try {
        // const _id = localStorage.getItem("jsl");
        const token = localStorage.getItem("auth-token");
        if (!newPassword || !oldPassword) {
          alert("Vui lòng nhập đầy đủ thông tin mật khẩu");
          return;
        }
        const response = await fetch(
          `http://localhost:4000/changepassword/${_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${token}`,
            },
            body: JSON.stringify({
              oldPassword: oldPassword,
              newPassword: newPassword,
              _id,
            }),
          }
        );
        const data = await response.json();
        if (!data.success) {
          alert(data.errors);
          return;
        } else {
          alert(data.message);
        }
        await fetchUserData();
      } catch (error) {
        // alert(`${newPassword} - ${oldPassword}`);
        console.error("Error changing user password:", error.message);
      }
    }
  };

  return (
    <div className="profile-container">
      {isLogin ? (
        <>
          <div>
            <h1>Thông tin người dùng</h1>
            {userData && (
              <div className="profile-info">
                <div className="input-field">
                  <p className="bold-text">Họ và tên khách hàng:</p>
                  {editName ? ( // Kiểm tra trạng thái chỉnh sửa tên, nếu đang chỉnh sửa sẽ hiển thị input để nhập
                    <input
                      type="text"
                      value={nameInput}
                      className="input-style"
                      onChange={handleNameChange}
                    />
                  ) : (
                    <input
                      className="input-style"
                      onClick={toggleEditName}
                      value={nameInput}
                      readOnly
                    ></input>
                  )}
                </div>
                <div className="input-field">
                  <p className="bold-text">Địa chỉ email:</p>
                  {editMail ? (
                    <input
                      type="text"
                      value={mailInput}
                      className="input-style"
                      onChange={handleMailChange}
                    />
                  ) : (
                    <input
                      className="input-style"
                      onClick={toggleEditMail}
                      value={mailInput}
                      readOnly
                    ></input>
                  )}
                </div>

                <div className="input-field">
                  <p className="bold-text">Số điện thoại</p>
                  <input
                    type="text"
                    value={numberPhone}
                    className="input-style"
                    onChange={handlePhoneChange}
                  />
                </div>
                <div className="input-field">
                  <p className="bold-text">Vai trò người dùng:</p>
                  <input
                    type="text"
                    value={userData.role}
                    className="input-style"
                    readOnly
                  />
                </div>
                {isChangePassword ? (
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      width: "200rem",
                    }}
                  >
                    <div className="input-field">
                      <p className="bold-text">Mật khẩu cũ</p>
                      <input
                        onChange={handleOldPassword}
                        type="password"
                        value={oldPassword}
                        className="input-style"
                      />
                    </div>
                    <div className="input-field">
                      <p className="bold-text">Mật khẩu mới</p>
                      <input
                        onChange={handleNewPassword}
                        type="password"
                        value={newPassword}
                        className="input-style"
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {isChangeAddress ? (
                  <>
                    <p className="bold-text">Địa chỉ mới:</p>
                    <input
                      className="input-style"
                      type="text"
                      placeholder="Số nhà, tên đường, hẻm, ngõ,..."
                      value={address}
                      onChange={handleAddressChange}
                    />
                    <div className="address_general">
                      <select
                        className="input-style"
                        name="province"
                        onChange={handleProvinceChange}
                        value={selectedProvince}
                      >
                        <option value="">Chọn tỉnh/thành phố</option>
                        {provinces.map((province, index) => (
                          <option key={index} value={province}>
                            {province}
                          </option>
                        ))}
                      </select>
                      <select
                        className="input-style"
                        name="district"
                        onChange={handleDistrictChange}
                        value={selectedDistricts}
                      >
                        <option value="">Chọn quận/huyện</option>
                        {districts.map((district, index) => (
                          <option key={index} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                      <select
                        name="ward"
                        className="input-style"
                        onChange={handleWardChange}
                        value={selectedWard}
                      >
                        <option value="">Chọn xã/phường</option>
                        {wards.map((ward, index) => (
                          <option key={index} value={ward}>
                            {ward}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {userData.address ? (
                  <>
                    <div>
                      <p className="bold-text">Địa Chỉ khách hàng:</p>
                      <input
                        className="input-style"
                        value={userData.address}
                        readOnly
                      ></input>
                    </div>
                    <div className="button-saveChange">
                      {changePasswordMode ? (
                        <button onClick={changeUserPassword}>
                          Cập nhật mật khẩu
                        </button>
                      ) : (
                        <button onClick={toggleChangePassword}>
                          Đổi mật khẩu
                        </button>
                      )}
                      {/* {!userData.address ? <button>Thêm địa chỉ</button> : <></>} */}
                      <button onClick={toggleChangeAddress}>Sửa địa chỉ</button>
                      <button
                        onClick={() => {
                          updateUserInfo();
                          changeUserPassword(localStorage.getItem("jsl"));
                        }}
                      >
                        Lưu thay đổi
                      </button>
                    </div>
                  </>
                ) : (
                  <div>
                    <p style={{ marginBottom: "15px" }}>
                      Bạn <b style={{ color: "red" }}>chưa có </b> thông tin địa
                      chỉ nào, vui lòng thêm địa chỉ!
                    </p>
                    <p className="bold-text">Địa chỉ:</p>
                    <input
                      className="input-style"
                      type="text"
                      placeholder="Số nhà, tên đường, hẻm, ngõ,..."
                      value={address}
                      onChange={handleAddressChange}
                    />
                    <div className="address_general">
                      <select
                        className="input-style"
                        name="province"
                        onChange={handleProvinceChange}
                        value={selectedProvince}
                      >
                        <option value="">Chọn tỉnh/thành phố</option>
                        {provinces.map((province, index) => (
                          <option key={index} value={province}>
                            {province}
                          </option>
                        ))}
                      </select>
                      <select
                        className="input-style"
                        name="district"
                        onChange={handleDistrictChange}
                        value={selectedDistricts}
                      >
                        <option value="">Chọn quận/huyện</option>
                        {districts.map((district, index) => (
                          <option key={index} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                      <select
                        name="ward"
                        className="input-style"
                        onChange={handleWardChange}
                        value={selectedWard}
                      >
                        <option value="">Chọn xã/phường</option>
                        {wards.map((ward, index) => (
                          <option key={index} value={ward}>
                            {ward}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="button-saveChange">
                      {changePasswordMode ? (
                        <button onClick={changeUserPassword}>
                          Cập nhật mật khẩu
                        </button>
                      ) : (
                        <button onClick={toggleChangePassword}>
                          Đổi mật khẩu
                        </button>
                      )}
                      {!userData.address ? <button>Sửa địa chỉ</button> : <></>}
                      <button
                        onClick={() => {
                          updateUserInfo();
                          changeUserPassword(localStorage.getItem("jsl"));
                        }}
                      >
                        Lưu thay đổi
                      </button>
                    </div>
                    {/* <div className="button-saveChange">
                    <button>Đổi mật khẩu</button>
                    <button>Sửa thông tin</button>
                    {!userData.address ? <button>Thêm địa chỉ</button> : <></>}
                    <button onClick={updateUserInfo}>Lưu thay đổi</button>
                  </div> */}
                  </div>
                )}
                {/* Hiển thị các thông tin khác của người dùng nếu cần */}
              </div>
            )}
          </div>
        </>
      ) : (
        <p className="error-message">
          <div>
            <button className="button-error">
              <i class="fa-regular fa-hand stopWatch"></i>
            </button>
            <div className="text-error">
              Chức năng xem thông tin người dùng chỉ khả dụng với tài khoản
              thành viên. Quý Khách cần đăng nhập để sử dụng chức năng này
            </div>
          </div>
        </p>
      )}
    </div>
  );
};

export default ProfileInfo;
