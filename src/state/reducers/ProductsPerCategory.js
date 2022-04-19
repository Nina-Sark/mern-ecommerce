import { createSlice } from "@reduxjs/toolkit";
import { fetchProductsPerCategory } from "../thunk/products/fetchProductsPerCategories";

const initialState = {
  productsPerCategories: {
    Accessories: [],
    Bags: [],
    Sports: [],
  },
  error: null,
  loading: false,
};

const ProductsPerCategory = createSlice({
  name: "productsPerCategory",
  initialState,
  reducers: {
    toggleLoading : (state = initialState, action) => {
      return {
        ...state,
        loading : action.payload
      }
    }
  },
  extraReducers: {
    [fetchProductsPerCategory.fulfilled]: (state = initialState, action) => {
      return {
        ...state,
        error: null,
        productsPerCategories: {
          ...state.productsPerCategories,
          [action?.payload?.category]: action?.payload?.data?.products,
        },
      };
    },
    [fetchProductsPerCategory.rejected]: (state = initialState, action) => {
      return {
        ...state,
        error: true,
      };
    },
  },
});

export const { toggleLoading } = ProductsPerCategory.actions;

export default ProductsPerCategory.reducer;
