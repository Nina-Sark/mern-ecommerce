import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingInfo: localStorage.getItem("shipping")
    ? JSON.parse(localStorage.getItem("shipping"))?.shippingInfo
    : {
        address: "",
        city: "",
        pincode: "",
        number: "",
        country: "",
        state: "",
      },
  step: localStorage.getItem("shipping")
    ? JSON.parse(localStorage.getItem("shipping"))?.step
    : 0,
};

const ShippingReducer = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    clearShipping: () => {
      localStorage.removeItem("shipping")
      return {
        shippingInfo: {
          address: "",
          city: "",
          pincode: "",
          number: "",
          country: "",
          state: "",
        },
        step: 0,
      };
    },
    getShippingDetails: (state = initialState, action) => {
      return {
        ...state,
        shippingInfo: action.payload,
      };
    },
    setStep: (state = initialState, action) => {
      return {
        ...state,
        step: action.payload,
      };
    },
  },
});

export const { getShippingDetails, setStep, clearShipping } = ShippingReducer.actions;

export default ShippingReducer.reducer;
