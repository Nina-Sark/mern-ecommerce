import { Popover, Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../state/thunk/products/deleteReview";
import { LoadingButton } from "./LoadingButton";
import { fetchProductReviews } from "../state/thunk/products/fetchProductReviews";
import { clearReviews } from "../state/reducers/DetailsReducer";
import { updateReview } from "../state/thunk/products/updateReview";

export const Review = ({
  productId,
  username,
  rating,
  content,
  userId,
  reviewId,
}) => {
  const dispatch = useDispatch();

  const [clamped, setClamped] = useState(content?.length > 500);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [stars, setStars] = useState(rating);
  const [comment, setComment] = useState(content);

  let { block, reviews } = useSelector((state) => state.details);
  const { user_auth } = useSelector((state) => state.user);
  const { review_delete_loading, review_update_loading } = useSelector(
    (state) => state.details
  );

  const handleReviewDelete = () => {
    dispatch(deleteReview({ productId, reviewId, token : user_auth?.token }));
  };

  const handleCancel = () => {
    setUpdateMode(false);
    setStars(rating);
    setComment(content);
  };

  const handleUpdate = () => {
    console.log(user_auth)
    dispatch(updateReview({ productId, rating: stars, comment, token : user_auth?.token }));
  };

  useEffect(() => {
    setTimeout(() => {
      if (!review_delete_loading) {
        setAnchorEl(null);
        if (block !== reviews.blocks && deleted) {
          dispatch(
            fetchProductReviews({
              id: productId,
              limit: 3,
              block,
              role: "delete",
            })
          );
        }
      }
      if (!review_update_loading) {
        setUpdateMode(false);
      }
    }, 200);
  }, [review_delete_loading, review_update_loading]);

  return (
    <div>
      <div className={`review${clamped ? "-closed" : ""}`}>
        <h1 className="font-medium text-xl">{username}</h1>
        {!updateMode ? (
          <Rating readOnly precision={0.5} value={rating} size="small" />
        ) : (
          <div className="flex items-center space-x-2">
            <Rating
              precision={0.5}
              onChange={(event, newValue) => setStars(newValue)}
              value={stars}
              size="medium"
            />
            <span>({stars})</span>
          </div>
        )}
        {!updateMode ? (
          <>
            <p className="mt-2 whitespace-pre-line">{content}</p>
            {content?.length > 500 && (
              <p
                onClick={() => setClamped(!clamped)}
                className="text-sm text-pink-700 mt-2 cursor-pointer transition"
              >
                {clamped ? "Read more" : "Close"}
              </p>
            )}
          </>
        ) : (
          <div>
            <textarea
              rows={5}
              className="w-full resize-none outline-2 outline-pink-500 p-4 border-4 rounded-lg border-pink-500 mt-4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex space-x-4 items-center mt-5">
              {!review_update_loading ? (
                <button
                  onClick={handleUpdate}
                  disabled={stars == rating && comment == content}
                  className={`px-4 py-2 ${
                    stars === rating && comment === content
                      ? "bg-gray-500"
                      : "bg-green-600 hover:bg-green-500"
                  } text-white rounded-lg`}
                >
                  Update
                </button>
              ) : (
                <LoadingButton
                  text="Update"
                  classes="bg-gray-500 text-white px-4 py-2 rounded-lg"
                />
              )}
              <button
                onClick={handleCancel}
                className="hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      {user_auth && userId === user_auth?.user?.id && !updateMode && (
        <div className="flex space-x-4 items-center mt-5">
          <button
            onClick={(e) => {
              setAnchorEl(e.target);
              setDeleted(true);
            }}
            className="px-4 py-1 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full text-white hover:from-blue-500 hover:to-pink-500"
          >
            Delete
          </button>
          {anchorEl && (
            <Popover
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Typography variant="h6" sx={{ p: 2 }}>
                Are you sure you want to delete the review?
              </Typography>
              <Box sx={{ px: 2, pb: 2, display: "flex", gap: "1em" }}>
                {!review_delete_loading ? (
                  <button
                    onClick={handleReviewDelete}
                    className="bg-green-600 hover:bg-green-500 text-white px-5 py-1 rounded-lg"
                  >
                    Yes
                  </button>
                ) : (
                  <LoadingButton
                    text="Yes"
                    classes="px-5 py-1 rounded-lg bg-gray-500 text-white"
                  />
                )}
                <button
                  disabled={review_delete_loading}
                  onClick={() => setAnchorEl(null)}
                  className={`px-5 py-1 rounded-lg ${
                    review_delete_loading
                      ? "bg-gray-200 cursor-none pointer-events-none"
                      : "bg-transparent cursor-pointer pointer-events-auto"
                  } hover:bg-red-600 hover:text-white`}
                >
                  Cancel
                </button>
              </Box>
            </Popover>
          )}
          <button
            onClick={() => setUpdateMode(true)}
            className="px-4 py-1 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full text-white hover:from-blue-500 hover:to-pink-500"
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};
