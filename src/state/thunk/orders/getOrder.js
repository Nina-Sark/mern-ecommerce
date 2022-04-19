import { createAsyncThunk } from "@reduxjs/toolkit";
import ORDER_API from "../../../api/order/endpoints";

export const getOrder = createAsyncThunk("orders/getOrder", async ({ id, token }, thunkAPI) => {
    try {
      const data = await ORDER_API.getOrderAPI(id, token)
      return data;
    } catch(err) {
        console.log(err)
    }
})