import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/products/endpoints";
import { toggleLoading } from "../../reducers/ProductsPerCategory";

export const fetchProductsPerCategory = createAsyncThunk(
  "productsPerCategory/fetchProductsPerCategory",
  async (options, thunkAPI) => {
    const { category, limit } = options;
    try {
      thunkAPI.dispatch(toggleLoading(true))
      const data = await API.getProductsPerCategoriesAPI(category, limit);
      thunkAPI.dispatch(toggleLoading(false))
      return { category: category, data };
    } catch (err) {
      return err;
    }
  }
);
