import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../components/Container";
import { fetchSingleProductDetails } from "../state/thunk/products/fetchSignleProductData";
import Rating from "@mui/material/Rating";
import formatAsCurrency from "../utils/currencyFormatter";
import { Loader } from "../components/Loader";
import { Reviews } from "../components/Reviews";
import { formatAsRating } from "../utils/formateAsRating";
import { fetchProductReviews } from "../state/thunk/products/fetchProductReviews";
import {
  clearReviews,
  toggleReviewDialog,
} from "../state/reducers/DetailsReducer";
import { ReviewDialog } from "../components/ReviewDialog";
import { AnimatePresence } from "framer-motion";
import { addItemToCart, increaseQuantity } from "../state/reducers/CartReducer";

export const Details = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productId } = useParams();

  const { data, loading, reviews, reviewDialogOpen, allReviews } = useSelector(
    (state) => state.details
  );
  const { cartItems } = useSelector((state) => state.cart);
  const { user_auth: auth } = useSelector((state) => state.user);
  const { userData } = useSelector((state) => state.userProfile);

  const alreadyReviewed =
    [...allReviews].filter(
      (review) => review?.user == userData?.user?._id
    )[0] ||
    [...reviews?.reviews].filter(
      (review) => review?.user == userData?.user?._id
    )[0];
  
    const quantity = cartItems.find((item) => item?.id === data?._id) ? cartItems.find((item) => item?.id === data?._id)?.quantity : data?.quantity
    const stock = cartItems.find((item) => item?.id === data?._id) ? cartItems.find((item) => item?.id === data?._id)?.inStock : data?.stock

  useEffect(() => {
    dispatch(clearReviews());
    dispatch(fetchSingleProductDetails({ id: productId }));
    dispatch(fetchProductReviews({ id: productId, limit: 3, block: 1 }));
  }, [productId]);

  useEffect(() => {
    if (loading) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [loading]);

  const handleDialog = () => {
    if (!auth) {
      navigate(`/login?redirect=details/${productId}`);
    } else {
      dispatch(toggleReviewDialog(true));
      document.body.style.overflowY = "hidden";
    }
  };

  const handleAddToCart = () => {
    if (!cartItems.find((product) => product?.id === data?._id)) {
      const productData = {
        id: data?._id,
        name: data?.name,
        price: data?.price,
        image: data?.images[0]?.url,
        inStock: data?.stock,
        quantity: 1,
        stock : data?.stock,
        totalSum: data?.price,
      };
      dispatch(addItemToCart(productData))
      navigate("/cart")
    } else {
      dispatch(increaseQuantity({ id : productId }))
      navigate("/cart")
    }
  };
 
  useEffect(() => {
    if(loading) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "auto"
    }
  }, [loading])

  return (
    <>
      {!loading ? (
        <Container>
          <AnimatePresence>
            {reviewDialogOpen && auth && <ReviewDialog />}
          </AnimatePresence>
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div>
              <Swiper
                className="h-[100%] w-[90%] md:w-[30rem]"
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                navigation
                scrollbar={{ draggable: true }}
                pagination={{ clickable: true }}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {data?.images?.map((img) => (
                  <SwiperSlide key={img?.public_id} className="w-[90%] h-max">
                    <img
                      className="h-max object-cover w-[100%]"
                      src={img?.url}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div>
              <h1 className="md:text-5xl leading-7 text-4xl max-w-full py-3 text-pink-500 font-bold mb-2">
                {data?.name}
              </h1>
              <div className="flex items-center space-x-4">
                <h1 className="text-3xl font-medium text-[#faaf00]">
                  {formatAsRating(data?.rating)}
                </h1>
                <Rating
                  value={Number(formatAsRating(data?.rating))}
                  readOnly
                  precision={0.25}
                  size="large"
                />
              </div>
              <div className="w-max bg-gradient-to-r mt-4 from-blue-500 to-pink-500 px-4 py-2 rounded-full">
                <span className="text-white">
                  {formatAsCurrency(data?.price)}
                </span>
              </div>
              <div className="mt-12">
                <p className="text-lg">{data?.description}</p>
              </div>
              {quantity !== data?.stock ? (
                <button
                  onClick={handleAddToCart}
                  className="w-[98%] mt-10 uppercase font-bold hover:from-blue-500 hover:to-pink-500 transition text-white rounded-2xl text-lg h-12 flex space-x-2 items-center justify-center bg-gradient-to-r from-pink-500 to-blue-400"
                >
                  add to card
                </button>
              ) : (
                <button className="w-[98%] mt-10 uppercase font-bold text-white rounded-2xl text-lg h-12 flex space-x-2 items-center justify-center bg-gray-500">
                  Out of stock
                </button>
              )}
              {!alreadyReviewed && (
                <button
                  onClick={handleDialog}
                  className="w-[98%] mt-5 uppercase font-bold hover:from-blue-500 hover:to-pink-500 transition text-white rounded-2xl text-lg h-12 flex space-x-2 items-center justify-center bg-gradient-to-r from-pink-500 to-blue-400"
                >
                  add review
                </button>
              )}
            </div>
          </section>
          {reviews?.reviews?.length > 0 && (
            <section className="mt-20">
              <h1 className="text-2xl uppercase font-bold text-blue-500">
                Reviews ({reviews?.numOfReviews})
              </h1>
              <Reviews
                reviews={reviews?.reviews}
                numOfReviews={reviews?.numOfReviews}
                blocks={reviews?.blocks}
              />
            </section>
          )}
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
};
