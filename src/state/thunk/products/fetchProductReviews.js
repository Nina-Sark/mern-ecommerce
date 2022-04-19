import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/products/endpoints";

export const fetchProductReviews = createAsyncThunk(
  "productDetails/fetchProductReviews",
  async (options, { dispatch }) => {
    const { id: productId, limit, block, role = "get" } = options;
   try {
    const reviews = await API.getProductReviewsAPI(productId, limit, block);
    localStorage.setItem("r",JSON.stringify(reviews))
    return { reviews, role };
   } catch(err) {
       console.log(err)
   }
  }
);
