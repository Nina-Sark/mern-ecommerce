import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/products/endpoints";

export const updateReview = createAsyncThunk(
  "details/updateReview",
  async (reviewData, thunkAPI) => {
    try {
      const { productId, rating, comment, token } = reviewData;
      const { review } = await API.updateReviewAPI(productId, rating, comment, token);
      console.log("review =========", review);
      return review;
    } catch (err) {
      console.log(err);
    }
  }
);