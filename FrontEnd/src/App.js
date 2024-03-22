import "./App.css";
import Navbar from "./Component/NavBar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import ShowProfile from "./Pages/ShowProfile";
import LoginSignUp from "./Pages/LoginSignUp";
import Footer from "./Component/Footer/Footer";
import men_banner from "./Component/Asset/banner_mens.png";
import women_banner from "./Component/Asset/banner_women.png";
import kid_banner from "./Component/Asset/banner_kids.png";
import Security from "./Component/Security/Security";
import Warranty from "./Component/Warranty/Warranty";
import EULA from "./Component/EULA/EULA";
import Checkout from "./Component/Checkout/Checkout";
import Confirmation from "./Component/Confirmation/Confirmation";
import Order from "./Component/Order/OrderSuccess";
import OrderDetail from "./Component/OrderDetail/OrderDetail";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Shop />}></Route>
          <Route
            path="/mens"
            element={<ShopCategory banner={men_banner} category="Phái mạnh" />}
          ></Route>
          <Route
            path="/womens"
            element={<ShopCategory banner={women_banner} category="Phái đẹp" />}
          ></Route>
          <Route
            path="/kids"
            element={<ShopCategory banner={kid_banner} category="Trẻ em" />}
          ></Route>
          {/* <Route path="/product" element={<Product />}></Route>
          <Route path=":productId" element={<Product />}></Route> */}
          <Route path="/product/:productId" element={<Product />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/profile" element={<ShowProfile />}></Route>
          <Route path="/login" element={<LoginSignUp />}></Route>
          <Route path="/security" element={<Security />}></Route>
          <Route path="/warranty" element={<Warranty />}></Route>
          <Route path="/eula" element={<EULA />}></Route>
          <Route path="/cart/checkout" element={<Checkout />}></Route>
          <Route
            path="/cart/checkout/confirm"
            element={<Confirmation />}
          ></Route>
          <Route path="/order" element={<Order />} />
          <Route path="/orderdetail/:orderId" element={<OrderDetail />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
