import { Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../state/reducers/ShippingReducer";
import formatAsCurrency from "../utils/currencyFormatter";

export const ShippingConfirm = () => {
  const dispatch = useDispatch()

  const { shippingInfo, step } = useSelector((state) => state.shipping);
  const { userData } = useSelector((state) => state.userProfile);
  const { cartItems, totalSum } = useSelector((state) => state.cart);

  return (
    <div className="flex md:flex-row flex-col md:items-start md:space-x-10">
      <div className="md:w-full w-[90%] px-4">
        <Typography sx={{ mb: 5 }} variant="h4">
          Shipping Details
        </Typography>
        <Typography sx={{ mb: 2 }} variant="body1">
          Name : {userData?.user?.name}
        </Typography>
        <Typography sx={{ mb: 2 }} variant="body1">
          Phone Number : {shippingInfo?.number}
        </Typography>
        <Typography sx={{ mb: 2 }} variant="body1">
          Address :{" "}
          {`${shippingInfo?.address}, ${shippingInfo?.city}, ${
            shippingInfo?.pincode
          }, ${shippingInfo?.country}${
            shippingInfo?.state ? `, ${shippingInfo?.state}` : ""
          }`}
        </Typography>
      </div>
      <div className="md:w-full w-[90%] px-4 mt-4 md:mt-0">
        <Typography sx={{ mb: 5 }} variant="h4">
          Cart Details
        </Typography>

        {cartItems.map(({ id, image, name, price, quantity, totalSum }) => (
          <div className="flex w-full space-x-4 justify-between items-center mb-3 py-2 border-b-2 border-b-blue-500">
            <div>
              <img width={100} height={150} className="mb-2" src={image} />
              <Typography variant="body2" sx={{ maxWidth: "200px" }}>
                {name}
              </Typography>
            </div>
            <div>
              <Typography sx={{ fontWeight: "bold" }} variant="body1">
                {`${formatAsCurrency(
                  Number(price)
                )} x ${quantity} = ${formatAsCurrency(Number(totalSum))}`}
              </Typography>
            </div>
          </div>
        ))}
        <div className="bg-blue-500 px-4 py-2 text-white">
          <Typography variant="h5">
            Total : {formatAsCurrency(Number(totalSum))}
          </Typography>
        </div>
        <div className="md:mt-4 mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
          <button onClick={() => dispatch(setStep(step - 1))} className="px-4 md:w-max w-full py-2 bg-blue-100 text-black rounded-full hover:bg-blue-200 transition">Back</button>
          <button onClick={() => dispatch(setStep(step + 1))} className="px-4 md:w-max w-full rounded-full py-2 bg-pink-500 text-white hover:bg-pink-600 transition">
            Proceed to payment
          </button>
        </div>
      </div>
    </div>
  );
};