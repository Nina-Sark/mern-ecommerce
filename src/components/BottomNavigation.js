import React from "react";
import { FaRegRegistered } from "react-icons/fa";
import { MdHome, MdLogin, MdLogout, MdShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const BottomNavigation = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user_auth: user } = useSelector((state) => state.user);

  const authenticatedLinks = ["/login", "/signup"]
  const navigationItems = [
    {
      icon: MdHome,
      title: "Home",
      link: "/",
    },
    {
      icon: MdLogin,
      title: "Log in",
      link: "/login",
    },
    {
      icon: MdShoppingCart,
      title: "Cart",
      link: "/cart",
    },
    {
      icon: FaRegRegistered,
      title: "Sign up",
      link: "/signup",
    },
  ];

  return (
    <div
      style={{ boxShadow: "0 0 5px silver" }}
      className="sticky bottom-0 flex bg-pink-200 z-[1000] divide-x-2 divide-pink-600 md:hidden"
    >
      {navigationItems.map(({ icon: Icon, title, link }) => (
        <div
          key={title}
          onClick={() => navigate(link)}
          className={`flex-1 px-4 py-2 flex-col items-center 
          ${authenticatedLinks?.includes(link) && user ? "hidden" : "flex"}
          ${
            pathname === link ? "bg-pink-600" : ""
          }`}
        >
          <Icon fontSize={30} color={pathname === link ? "#fff" : "#000"}/>
          <small className={`${pathname === link ? "text-white font-bold" : "text-black"}`}>{title}</small>
        </div>
      ))}
    </div>
  );
};
