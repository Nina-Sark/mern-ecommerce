import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CartDetailsItem } from "../components/CartDetails";
import { Container } from "../components/Container";
import { Loader } from "../components/Loader";
import { getOrder } from "../state/thunk/orders/getOrder";
import formatAsCurrency from "../utils/currencyFormatter";

export const SingleOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const { user_auth } = useSelector((state) => state?.user);
  const { order, single_order_loading } = useSelector((state) => state.order);
  console.log("000", order);

  useEffect(() => {
    dispatch(getOrder({ id, token: user_auth?.token }));
  }, []);

  return (
    <>
      {!single_order_loading ? (
        <Container classes="flex flex-col md:flex-row space-y-4 space-x-0 md:space-y-0 md:space-x-5 min-h-[50vh]">
          <div className="w-full px-4">
            <Typography sx={{ mb: 5 }} variant="h4">
              Shipping Details
            </Typography>
            <Typography sx={{ mb: 2 }} variant="body1">
              Name : {order?.user?.name}
            </Typography>
            <Typography sx={{ mb: 2 }} variant="body1">
              Payment status : {order?.paymentInfo?.status}
            </Typography>
            <Typography sx={{ mb: 2 }} variant="body1">
              Phone Number : {order?.shippingInfo?.phoneNo}
            </Typography>
            <Typography sx={{ mb: 2 }} variant="body1">
              Address :{" "}
              {`${order?.shippingInfo?.address}, ${
                order?.shippingInfo?.city
              }, ${order?.shippingInfo?.pinCode}, ${
                order?.shippingInfo?.country
              }${
                order?.shippingInfo?.state
                  ? `, ${order?.shippingInfo?.state}`
                  : ""
              }`}
            </Typography>
          </div>
          <div className="w-full">
            <Typography sx={{ mb: 5 }} variant="h4">
              Cart Details
            </Typography>
            {order?.orderItems?.map(
              ({ product: id, image, name, price, quantity }) => (
                <CartDetailsItem
                  id={id}
                  image={image}
                  name={name}
                  price={price}
                  quantity={quantity}
                  totalSum={Number(price * quantity)}
                />
              )
            )}
          </div>
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
};
