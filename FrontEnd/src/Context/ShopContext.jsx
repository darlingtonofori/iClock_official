import React, { createContext, useState } from "react";
import CartItem from "../Component/CartItems/CartItem";
import { useEffect } from "react";
import "moment-timezone";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [sortByPriceDescending, setSortByPriceDescending] = useState(false);
  const [sortByPriceClicked, setSortByPriceClicked] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [selectedFace, setSelectedFace] = useState(null);
  const [selectedStrap, setSelectedStrap] = useState(null);
  const [selectedFaceForProducts, setSelectedFaceForProducts] = useState({});
  const [selectedStrapForProducts, setSelectedStrapForProducts] = useState({});

  useEffect(() => {
    fetch("http://localhost:4000/allproduct")
      .then((res) => res.json())
      .then((data) => {
        setAll_Product(data);

        if (localStorage.getItem("auth-token")) {
          fetch("http://localhost:4000/getcart", {
            method: "POST",
            headers: {
              Accept: "application/form-data",
              "auth-token": `${localStorage.getItem("auth-token")}`,
              "Content-Type": "application/json",
            },
            body: "",
          })
            .then((res) => res.json())
            .then((data) => setCartItems(data));
        }
      });
  }, []);

  const toggleSortByPriceDescending = () => {
    setSortByPriceClicked(true);
    setSortByPriceDescending(!sortByPriceDescending);
  };

  const updateSelectedFace = (face) => {
    setSelectedFace(face);
  };

  const updateSelectedStrap = (strap) => {
    setSelectedStrap(strap);
  };

  const sortedProducts = setSortByPriceClicked
    ? all_product.slice().sort((a, b) => {
        if (sortByPriceDescending) {
          return (
            parseInt(b.new_price.replace(/[^\d]/g, "")) -
            parseInt(a.new_price.replace(/[^\d]/g, ""))
          );
        } else {
          return (
            parseInt(a.new_price.replace(/[^\d]/g, "")) -
            parseInt(b.new_price.replace(/[^\d]/g, ""))
          );
        }
      })
    : all_product;

  const addToCart = (itemId, selectedFace, selectedStrap) => {
    setSelectedFaceForProducts((prev) => ({ ...prev, [itemId]: selectedFace }));
    setSelectedStrapForProducts((prev) => ({
      ...prev,
      [itemId]: selectedStrap,
    }));

    localStorage.setItem(`selectedFace_${itemId}`, selectedFace);
    localStorage.setItem(`selectedStrap_${itemId}`, selectedStrap);

    // // Lưu selectedFace và selectedStrap vào localStorage
    // localStorage.setItem(`selectedFace_${itemId}`, selectedFace);
    // localStorage.setItem(`selectedStrap_${itemId}`, selectedStrap);

    if (!localStorage.getItem("auth-token")) {
      alert("Bạn cần đăng nhập trước khi thêm sản phẩm vào giỏ hàng");
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      // Lưu selectedFace và selectedStrap vào localStorage

      const updatedCartItems = {
        ...cartItems,
        [itemId]: cartItems[itemId] + 1,
      };

      if (localStorage.getItem("auth-token")) {
        fetch("http://localhost:4000/addToCart", {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemId: itemId,
            selectedFace: selectedFace,
            selectedStrap: selectedStrap,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      }
    }
  };

  useEffect(() => {
    for (const itemId in cartItems) {
      const storedSelectedFace = localStorage.getItem(`selectedFace_${itemId}`);
      const storedSelectedStrap = localStorage.getItem(
        `selectedStrap_${itemId}`
      );
      if (storedSelectedFace && storedSelectedStrap) {
        setSelectedFaceForProducts((prev) => ({
          ...prev,
          [itemId]: storedSelectedFace,
        }));
        setSelectedStrapForProducts((prev) => ({
          ...prev,
          [itemId]: storedSelectedStrap,
        }));
      }
    }
  }, [cartItems]);

  const removeFromCart = (itemId) => {
    // Remove the item from localStorage
    localStorage.removeItem(`selectedFace_${itemId}`);
    localStorage.removeItem(`selectedStrap_${itemId}`);

    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (cartItems[itemId] === 1) {
      // Remove the item from state
      setSelectedFaceForProducts((prev) => {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      });
      setSelectedStrapForProducts((prev) => {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      });
    }

    // Update the cartItems state
    // setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    // If user is logged in, update the cart on the server
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  const applyPromo = async (promoCode) => {
    await fetch("http://localhost:4000/checkpromocode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ promoCode: promoCode }),
    })
      .then((resp) => resp.json())
      .then(async (data) => {
        if (data.success) {
          if (
            data.currentDate >= data.startDate &&
            data.currentDate <= data.endDate
          ) {
            setPromoApplied(true);
            setDiscount(data.discount);
            alert(
              `Bạn được giảm: ${data.discount}%. Chúc quý khách trải nghiệm cảm giác mua sắm thật thú vị!`
            );
          } else {
            setPromoApplied(false);
            alert(
              `Mã đã hết hạn hoặc đã được sử dụng. Hẹn gặp bạn trong các lần khuyến mãi sau!`
            );
            setDiscount(0);
          }
        } else {
          setPromoApplied(false);
          alert(
            `Mã đã hết hạn hoặc đã được sử dụng. Hẹn gặp bạn trong các lần khuyến mãi sau!`
          );
          setDiscount(0);
        }
      });
  };

  const getTotalCart = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInformation = all_product.find(
          (product) => product.id === Number(item)
        );
        let new_price = parseInt(
          itemInformation.new_price.replace(/[^\d]/g, "")
        );
        totalAmount = totalAmount + new_price * cartItems[item];
      }
    }
    let showtotalAmount = totalAmount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return showtotalAmount;
  };

  const getTotalItem = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem = totalItem + cartItems[item];
      }
    }
    return totalItem;
  };

  const getTotalCartPromote = () => {
    let totalCart = parseInt(getTotalCart().replace(/[^\d]/g, ""));
    let totalCartPromotion = totalCart;
    if (promoApplied) {
      let discountAmount = totalCart * (parseInt(discount) / 100);
      totalCartPromotion = totalCart - discountAmount;
    }
    let totalCartPromote = totalCartPromotion
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return totalCartPromote;
  };

  const contextValue = {
    getTotalItem,
    getTotalCart,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    all_product: sortedProducts,
    toggleSortByPriceDescending,
    promoApplied,
    applyPromo,
    getTotalCartPromote,
    selectedFace,
    selectedStrap,
    updateSelectedFace,
    updateSelectedStrap,
    selectedFaceForProducts,
    selectedStrapForProducts,
    discount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
