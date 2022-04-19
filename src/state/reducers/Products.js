import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../thunk/products/fetchProducts";

const initialState = {
  loading: false,
  keyword: null,
  priceRange: [undefined, undefined],
  data: {},
};

const Products = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductsData: (state = initialState, action) => {
      return {
        ...state,
        keyword: null,
        priceRange: [undefined, undefined],
        data: {},
      };
    },
    toggleKeyword: (state = initialState, action) => {
      return {
        ...state,
        keyword: action.payload,
      };
    },
    setPriceRange: (state = initialState, action) => {
      return {
        ...state,
        priceRange: action.payload,
      };
    },
  },
  extraReducers: {
    [fetchProducts.fulfilled]: (state = initialState, action) => {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    },
    [fetchProducts.pending]: (state = initialState, action) => {
      return {
        ...state,
        loading: true,
      };
    }
  },
});

export const {
  toggleKeyword,
  setPriceRange,
  clearProductsData,
} = Products.actions;

export default Products.reducer;
