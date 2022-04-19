import axios from "axios";
import Cookies from "js-cookie";

const headersOptions = {
  headers: {
    authorization: `Bearer ${
      Cookies.get("auth") ? JSON.parse(Cookies.get("auth"))?.token : ""
    }`,
  },
};

const getProductsPerCategories = async (category, limit) => {
  const { data } = await axios.get(
    `/products?category=${category}&limit=${limit}&fields=images,name,price`
  );
  return data;
};

const getSingleProduct = async (productId) => {
  const { data } = await axios.get(`/products/${productId}`);
  return data;
};

const getProductsByCategory = async (search) => {
  const searchStr = `/products${search}&fields=name,images,price&limit=8`;
  const { data } = await axios.get(searchStr);
  return data;
};

const getProductReviews = async (productId, limit, block) => {
  console.log(limit, block);
  const { data } = await axios.get(
    `/products/${productId}/reviews?limit=${limit}&block=${block}`
  );
  return data;
};

const addReview = async (productId, rating, comment, token) => {
  try {
    const body = { rating, comment };
    const { data } = await axios.post(
      `/products/${productId}/newReview`,
      body,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    return { error: err?.response?.data?.error };
  }
};

const removeReview = async (productId, reviewId, token) => {
  try {
    const { data } = await axios.delete(
      `/products/${productId}/reviews/${reviewId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data, headersOptions);
    return data;
  } catch (err) {
    return { error: err?.response?.data?.error };
  }
};

const updateReview = async (productId, rating, comment, token) => {
  const body = { rating, comment };
  try {
    const { data } = await axios.post(
      `/products/${productId}/newReview`,
      body,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    return { error: err?.response?.data?.error };
  }
};

const API = {
  getProductsPerCategoriesAPI: getProductsPerCategories,
  getSingleProductAPI: getSingleProduct,
  getProductsByCategoryAPI: getProductsByCategory,
  getProductReviewsAPI: getProductReviews,
  addReviewAPI: addReview,
  removeReviewAPI: removeReview,
  updateReviewAPI : updateReview
};

export default API;
