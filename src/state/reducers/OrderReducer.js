import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "../thunk/orders/createOrder";
import { getOrder } from "../thunk/orders/getOrder";
import { getOrders } from "../thunk/orders/getOrders";

const initialState = {
  orders: [],
  order : null,
  new_order_error: null,
  get_orders_loading: false,
  single_order_loading : false
};

const OrderReducer = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    [createOrder.fulfilled]: (state = initialState, action) => {
      console.log("ooooooooorder =", action.payload);
      const isError = Object.keys(action.payload)?.includes("error");
      return {
        ...state,
        [isError ? "new_order_error" : "orders"]: isError
          ? action.payload?.error
          : [action.payload?.order, ...state.orders],
      };
    },
    [getOrders.pending]: (state = initialState, action) => {
      return {
        ...state,
        get_orders_loading: true,
      };
    },
    [getOrders.fulfilled]: (state = initialState, action) => {
      console.log(action.payload)
      return {
        ...state,
        get_orders_loading: false,
        orders: action.payload?.orders,
      };
    },
    [getOrder.pending]: (state = initialState, action) => {
      return {
        ...state,
        single_order_loading: true,
      };
    },
    [getOrder.fulfilled]: (state = initialState, action) => {
      console.log(action.payload)
      return {
        ...state,
        single_order_loading: false,
        order: action.payload?.order,
      };
    },
  },
});

export default OrderReducer.reducer;
