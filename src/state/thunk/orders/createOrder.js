import { createAsyncThunk } from "@reduxjs/toolkit";
import ORDER_API from "../../../api/order/endpoints";

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ orderInfo, token }, thunkAPI) => {
    try {
      const data = await ORDER_API.createOrderAPI(orderInfo, token);
      localStorage.removeItem("cart")
      localStorage.removeItem("shipping")
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);