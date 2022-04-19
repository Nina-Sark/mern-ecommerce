import { createAsyncThunk } from "@reduxjs/toolkit";
import ORDER_API from "../../../api/order/endpoints";

export const getOrders = createAsyncThunk("orders/getOrders", async (token, thunkAPI) => {
    try {
      const data = await ORDER_API.getOrdersAPI(token)
      return data;
    } catch(err) {
        console.log(err)
    }
})