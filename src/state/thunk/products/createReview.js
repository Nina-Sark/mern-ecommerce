import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/products/endpoints";

export const createReview = createAsyncThunk(
  "details/createReview",
  async (reviewData, thunkAPI) => {
    try {
      const { productId, rating, comment, token } = reviewData;
      const { review } = await API.addReviewAPI(productId, rating, comment, token);
      console.log("review =========", review);
      return review;
    } catch (err) {
      console.log(err);
    }
  }
);