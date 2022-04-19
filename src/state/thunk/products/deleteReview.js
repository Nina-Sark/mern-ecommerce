import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/products/endpoints";

export const deleteReview = createAsyncThunk(
  "productDetails/deleteReview",
  async (options, thunkAPI) => {
    try {
      const { productId, reviewId, token } = options;
      const data = await API.removeReviewAPI(productId, reviewId, token);
      return { reviewId };
    } catch (err) {
      console.log(err);
    }
  }
);
