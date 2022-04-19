import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getScrollPosition, handleFocus } from "./state/reducers/Search";
import { SearchDialog } from "./components/SearchDialog";
import { AnimatePresence } from "framer-motion";
import { Footer } from "./components/Footer";
import { Details } from "./pages/Details";
import { ProductsDisplay } from "./pages/ProductsDisplay";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Loader } from "./components/Loader";
import { useEffect, useState } from "react";
import { fetchCurrentUserData } from "./state/thunk/user/fetchCurrUserData";
import { Profile } from "./pages/Profile";
import { UpdateProfile } from "./pages/UpdateProfile";
import { PasswordChange } from "./pages/PasswordChange";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { Cart } from "./pages/Cart";
import { BottomNavigation } from "./components/BottomNavigation";
import { Shipping } from "./pages/Shipping";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { Orders } from "./pages/Orders";
import { SingleOrder } from "./pages/SingleOrder";

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  let [stripeKey, setStripeKey] = useState("");

  const pathNotIncluded = [
    "/login",
    "/signup",
    "/forgotpassword",
    "/updateprofile",
    "/changepassword",
    "/forgotpassword",
    "/passwordreset",
    "/payment",
  ];

  const hidden = pathNotIncluded.includes(`/${pathname.trim().split("/")[1]}`);

  const { dialogOpen } = useSelector((state) => state.search);
  const { auth_logout_loading, user_auth } = useSelector((state) => state.user);
  const { user_loading } = useSelector((state) => state.userProfile);

  async function getStripeApiKey() {
    const {
      data: { stripeApiKey },
    } = await axios.get(`${process.env.REACT_APP_URL}/payment/stripeApiKey`, {
      headers: {
        authorization: `Bearer ${user_auth?.token}`,
      },
    });
    stripeKey = stripeApiKey;
    setStripeKey(stripeKey);
  }

  const handleClickAway = (e) => {
    if (e?.target?.dataset?.element?.includes("search")) return;
    dispatch(handleFocus(false));
  };

  document.addEventListener("scroll", () => {
    dispatch(getScrollPosition(Math.ceil(window.scrollY)));
  });

  useEffect(() => {
    if (user_auth) {
      console.log(user_auth);
      dispatch(fetchCurrentUserData("avatar,name,email"));
    }
  }, [user_auth]);

  useEffect(() => {
    if (auth_logout_loading || user_loading) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [auth_logout_loading, user_loading]);

  useEffect(async () => {
    if (user_auth) {
      await getStripeApiKey();
    }
  }, []);

  return (
    <div className="relative" onClick={handleClickAway}>
      <AnimatePresence>{dialogOpen && <SearchDialog />}</AnimatePresence>
      {!hidden && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={"/details/:productId"} element={<Details />} />
        <Route
          path={"/products"}
          element={<ProductsDisplay role="products" />}
        />
        <Route path={"/search"} element={<ProductsDisplay role="search" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute redirect="/">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateprofile"
          element={
            <ProtectedRoute redirect="/">
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/changepassword"
          element={
            <ProtectedRoute redirect="/">
              <PasswordChange />
            </ProtectedRoute>
          }
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/passwordreset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        {stripeKey && (
          <Route
            path="/shipping"
            element={
              <Elements stripe={loadStripe(stripeKey)}>
                <ProtectedRoute redirect="/">
                  <Shipping />
                </ProtectedRoute>
              </Elements>
            }
          />
        )}
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<SingleOrder />} />
      </Routes>
      {(auth_logout_loading || user_loading) && <Loader />}
      {!hidden && <Footer />}
      <BottomNavigation />
    </div>
  );
}

export default App;
