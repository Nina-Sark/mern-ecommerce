import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/products/endpoints";
//import { fetchProductReviews } from "./fetchProductReviews";

export const fetchSingleProductDetails = createAsyncThunk("productDetails/fetchSingleProductDetails", async (options, { dispatch, rejectWithValue }) => {
    const { id } = options;
    try {
      const data = await API.getSingleProductAPI(id);
     // dispatch(fetchProductReviews({ id, limit, block }))
      return data.product
    } catch(err) {
      rejectWithValue(err)
    }
})