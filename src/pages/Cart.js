import React from "react";
import { useDispatch, useSelector } from "react-redux";
import emptyCartAnimation from "../lotties/80582-empty-cart.json";
import Lottie from "lottie-react";
import { Container } from "../components/Container";
import { IconButton } from "@mui/material";
import { MdClose } from "react-icons/md";
import formatAsCurrency from "../utils/currencyFormatter";
import { FaMinus, FaPlus } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../state/reducers/CartReducer";
import { Link, useNavigate } from "react-router-dom";

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { cartItems, totalSum } = useSelector((state) => state.cart);
  const { user_auth } = useSelector((state) => state.user);
  console.log(cartItems)

  const handleRemoveItem = (productId) => {
    dispatch(removeItem({ id: productId }));
  };

  const handleIncrease = (productId, inStock, quantity) => {
    console.log("iiiiiiiiiiii", inStock, quantity);
    if (quantity < inStock) {
      dispatch(increaseQuantity({ id: productId }));
    }
  };

  const handleDecrease = (productId, quantity) => {
    if (quantity !== 1) {
      dispatch(decreaseQuantity({ id: productId }));
    }
  };

  const handleCheckout = () => {
    if(!user_auth) {
       navigate("/login?redirect=shipping")
    } else {
      navigate("/shipping")
    }
  }

  return (
    <>
      {cartItems?.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center mt-16">
            <h1 className="md:text-3xl text-2xl font-bold text-[#021030]">
              Your cart is empty
            </h1>
            <div className="relative flex flex-col items-center">
              <Lottie
                animationData={emptyCartAnimation}
                loop={true}
                autoplay={true}
                style={{ height: "max-content", width: "100%" }}
              />
            </div>
          </div>
        </div>
      ) : (
        <Container classes="min-h-[50vh]">
          <div className="overflow-x-auto">
            <table className="min-w-5xl w-full">
              <tr className="bg-blue-500 w-full text-pink-100">
                <th className="text-left p-4 text-xl">Product </th>
                <th className="text-left p-4 text-xl">Name</th>
                <th className="text-left p-4 text-xl">Quantity</th>
                <th className="text-left p-4 text-xl">Price</th>
                <th className="text-left p-4 text-xl">Total</th>
                <th className="text-right p-4 text-xl">Remove</th>
              </tr>
              <AnimatePresence>
                {cartItems?.map((item) => (
                  <tr
                    key={item?.id}
                    className="w-full border-b-2 border-b-blue-500"
                    initial={{ x: 0, opacity: 1 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 1000 }}
                  >
                    <td className="px-4 py-8">
                      <Link to={`/details/${item?.id}`}>
                        <img width={100} height={100} src={item?.image} />
                      </Link>
                    </td>
                    <td className="px-4 py-8">{item?.name}</td>
                    <td className="px-4 py-8">
                      <div className="flex w-max">
                        <button
                          disabled={item?.quantity === item?.inStock}
                          onClick={() =>
                            handleIncrease(
                              item?.id,
                              item?.inStock,
                              item?.quantity
                            )
                          }
                          className={`w-[40px] ${
                            item?.quantity === item?.inStock
                              ? "bg-gray-500"
                              : "bg-pink-500 hover:bg-pink-600 active:bg-pink-600"
                          } h-[40px] flex justify-center items-center`}
                        >
                          <FaPlus color="#fff" />
                        </button>
                        <div className="w-max border-2 min-w-[40px] border-pink-500 h-[40px] px-2 flex justify-center items-center">
                          {item?.quantity}
                        </div>
                        <button
                          onClick={() =>
                            handleDecrease(item?.id, item?.quantity)
                          }
                          className={`w-[40px] ${
                            item?.quantity === 1
                              ? "bg-gray-500"
                              : "hover:bg-pink-600 active:bg-pink-600 bg-pink-500"
                          } h-[40px] flex justify-center items-center`}
                        >
                          <FaMinus color="#fff" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-8">
                      {formatAsCurrency(item?.price)}
                    </td>
                    <td className="px-4 py-8">
                      {formatAsCurrency(item?.totalSum)}
                    </td>
                    <td align="right" className="px-4 py-8">
                      <IconButton onClick={() => handleRemoveItem(item.id)}>
                        <MdClose color="#EA75BA" />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </AnimatePresence>
            </table>
          </div>
          <div className="flex flex-col space-y-4 items-end w-full my-5">
            <div className="bg-blue-500 w-full md:w-max text-white px-8 py-2 rounded-full">
              Items : {formatAsCurrency(totalSum)}
            </div>
            <button 
            onClick={handleCheckout}
            className="bg-pink-500 hover:bg-pink-600 transition w-full md:w-max text-white px-8 py-2 rounded-full">
              Check out
            </button>
          </div>
        </Container>
      )}
    </>
  );
};
