import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/products/endpoints";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (options, { dispatch }) => {
    const { search } = options;
    const {
      highestPrice,
      pages,
      numOfProducts,
      products,
    } = await API.getProductsByCategoryAPI(search);
    return { highestPrice, pages, numOfProducts, products };
  }
);