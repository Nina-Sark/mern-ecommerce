import { Rating, ratingClasses } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toggleReviewDialog } from "../state/reducers/DetailsReducer";
import { createReview } from "../state/thunk/products/createReview";
import { ModalContainer } from "./ModalContainer";
import { LoadingButton } from "./LoadingButton";

export const ReviewDialog = () => {
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState(true);
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);

  const { user_auth } = useSelector((state) => state.user)
  const { userData } = useSelector((state) => state.userProfile);
  const { new_review_loading } = useSelector((state) => state.details);
  
  const { productId } = useParams();

  useEffect(() => {
    if (comment?.length > 30) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [comment]);

  const handleClose = () => {
    dispatch(toggleReviewDialog(false));
    document.body.style.overflowY = "auto";
  };

  const handleNewReview = () => {
    console.log(user_auth)
    console.log(productId, stars, comment);
    dispatch(createReview({ productId, rating: stars, comment, token : user_auth?.token }));
  };

  useEffect(() => {
     if(!new_review_loading && comment?.length > 0 && stars) {
       handleClose()
     }
  }, [new_review_loading])

  return (
    <ModalContainer>
      <div className="flex flex-col space-y-7 w-full items-center">
        <h1 className="text-center overflow-visible text-5xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 font-bold">
          Please leave us feedback
        </h1>
        <div className="flex flex-col items-center rounded-3xl shadow-blue-500 drop-shadow-2x w-[90%] md:w-[50%] lg:w-[30%] bg-pink-300">
          <div className="w-full bg-white flex justify-center rounded-tr-3xl rounded-tl-3xl py-2">
            <Rating
              size="large"
              precision={0.5}
              sx={{ "& .MuiRating-iconFilled": { color: "#3b82f6" } }}
              value={stars}
              onChange={(event, newValue) => setStars(newValue)}
            />
          </div>
          <input
            className="w-full bg-blue-400 px-6 py-2 border-b-2 text-white border-b-white outline-none"
            value={userData?.user?.name}
            readOnly
          />
          <textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="Comment..."
            className="w-full bg-blue-400 resize-none text-white px-6 py-2 placeholder:text-gray-700 outline-none"
            rows={4}
          />
          {!new_review_loading ? (
            <button
              onClick={handleNewReview}
              className={`w-full text-white rounded-sm text-lg h-12 border-b-2 border-b-white flex space-x-2 items-center justify-center ${
                !disabled &&
                "bg-gradient-to-r from-pink-500 to-pink-600 cursor-pointer"
              } ${disabled && "bg-gray-400 cursor-not-allowed"}`}
            >
              Add
            </button>
          ) : (
            <LoadingButton text="Add" classes="w-full bg-gray-400 text-white rounded-sm text-lg h-12 border-b-2 border-b-white" />
          )}
          <button
            disabled={new_review_loading}
            onClick={handleClose}
            className={`w-full rounded-br-3xl rounded-bl-3xl text-white rounded-sm text-lg h-12 flex space-x-2 items-center justify-center bg-gradient-to-r from-pink-500 to-pink-600`}
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};
