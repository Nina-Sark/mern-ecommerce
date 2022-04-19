import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Head } from "./Head";
import { Typography } from "@mui/material";
import { AlertComponent } from "./AlertComponent";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { MdCalendarToday, MdCreditCard, MdVpnKey } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../state/thunk/orders/createOrder";
import { clearShipping } from "../state/reducers/ShippingReducer";
import { clearCart } from "../state/reducers/CartReducer";
import { LoadingButton } from "../components/LoadingButton";
import { BsPlayBtn } from "react-icons/bs";

export const PaymentForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  let payBtn = useRef(null);

  const { cartItems, totalSum } = useSelector((state) => state.cart);
  const { shippingInfo } = useSelector((state) => state.shipping);
  const { user_auth } = useSelector((state) => state.user);
  const { userData } = useSelector((state) => state.userProfile);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const paymentData = {
    amount: Math.round(totalSum * 100),
  };

  let orderInfo = {
    shippingInfo: {
      ...shippingInfo,
      pinCode: shippingInfo?.pincode,
      phoneNo: shippingInfo?.number,
    },
    orderItems: cartItems?.map((item) => ({
      name: item?.name,
      price: item?.price,
      quantity: item?.quantity,
      image: item?.image,
      product: item?.id,
    })),
    paymentInfo: null,
    itemsPrice: totalSum,
    taxPrice: 30,
    shippingPrice: 15,
    totalPrice: totalSum - (30 + 15),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      setLoading(true);
      const { data } = await axios.post("/payment/process", paymentData, {
        headers: {
          authorization: `Bearer ${user_auth?.token}`,
        },
      });

      const client_secret = data?.clientSecret;

      if (!stripe || !elements) return;

      console.log(client_secret);

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: userData?.name,
            email: userData?.email,
            address: {
              line1: shippingInfo?.address,
              city: shippingInfo?.city,
              state: shippingInfo?.state,
              postal_code: shippingInfo?.pincode,
              country: shippingInfo?.country,
            },
          },
        },
      });

      console.log(result);

      if (result?.error) {
        setError(result?.error?.message);
        setLoading(false);
        console.log(result?.error);
      } else {
        if (result?.paymentIntent?.status === "succeeded") {
          setLoading(true);
          orderInfo["paymentInfo"] = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder({ orderInfo, token: user_auth?.token }));
          setError(null);
          setLoading(false);
          payBtn.current.disabled = true;
          dispatch(clearShipping());
          dispatch(clearCart());
          navigate("/payment/success");
        } else {
          setError("Some error occured. Try again.");
          setLoading(false);
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      setError(error);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      {error && (
        <AlertComponent
          open={true}
          message={error}
          status={"error"}
          onCloseF={() => setError(null)}
        />
      )}
      <Head title="Payment" />
      <form
        className="lg:w-[40%] md:w-[60%] w-[80%] flex flex-col space-y-6 items-center"
        onSubmit={handleSubmit}
      >
        <Typography sx={{ mb: 2, textAlign: "center" }} variant="h4">
          Card Info
        </Typography>
        <div className="flex w-full items-center space-x-4 px-4 py-2 rounded-lg border-2 border-pink-500">
          <MdCreditCard size={25} />
          <CardNumberElement className="paymentInput" />
        </div>
        <div className="flex w-full items-center space-x-4 px-4 py-2 rounded-lg border-2 border-pink-500">
          <MdVpnKey size={25} />
          <CardCvcElement className="paymentInput" />
        </div>
        <div className="flex w-full items-center space-x-4 px-4 py-2 rounded-lg border-2 border-pink-500">
          <MdCalendarToday size={25} />
          <CardExpiryElement className="paymentInput" />
        </div>
        {!loading ? (
          <button
            ref={payBtn}
            className="w-full py-2 bg-pink-500 text-white hover:bg-pink-600 transition"
          >
            Pay
          </button>
        ) : (
          <LoadingButton
            text="Pay"
            classes="w-full py-2 bg-gray-500 text-white"
          />
        )}
      </form>
    </>
  );
};