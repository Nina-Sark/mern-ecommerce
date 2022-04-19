import axios from "axios";

const createOrder = async (orderInfo, token) => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_URL}/orders`, orderInfo, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return { error: error?.response?.data?.error };
  }
};

const getOrders = async (token) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_URL}/orders`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return { error: error?.response?.data?.error };
  }
};

const getOrder = async (id, token) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_URL}/orders/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return { error: error?.response?.data?.error };
  }
};

const ORDER_API = {
  createOrderAPI: createOrder,
  getOrdersAPI: getOrders,
  getOrderAPI : getOrder
};

export default ORDER_API;