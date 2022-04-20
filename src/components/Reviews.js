import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductReviews } from "../state/thunk/products/fetchProductReviews";
import { Review } from "./Review";
import { HeartSpinner } from "react-spinners-kit";
import { setBlock } from "../state/reducers/DetailsReducer";

export const Reviews = ({ reviews, numOfReviews, blocks }) => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { reviewsLoader } = useSelector((state) => state.details);

  let { block } = useSelector((state) => state.details)

  const handleShowMore = () => {
    block += 1;
    dispatch(setBlock(block))
    dispatch(fetchProductReviews({ id: productId, limit: 3, block }));
  };

  const reviewsComponent = useMemo(() => {
    return reviews?.map((review) => (
      <Review
        productId={productId}
        userId={review?.user}
        reviewId={review?._id}
        username={review?.name}
        rating={review?.rating}
        content={review?.comment}
      />
    ));
  }, [block, reviews]);

  return (
    <div className="mt-10 space-y-10 flex flex-col">
      {reviewsComponent}
      {reviewsLoader && (
        <div className="w-full flex justify-center">
          <HeartSpinner size={50} color="#ec4899" />
        </div>
      )}
      {block !== blocks && (
        <div className="w-full flex justify-center">
          <button
            className="bg-gradient-to-r shadow-lg text-white w-max from-pink-500 to-blue-500 px-4 py-2 rounded-2xl"
            onClick={handleShowMore}
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
};
