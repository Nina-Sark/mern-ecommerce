import { createSlice } from "@reduxjs/toolkit";
import { createReview } from "../thunk/products/createReview";
import { deleteReview } from "../thunk/products/deleteReview";
import { fetchProductReviews } from "../thunk/products/fetchProductReviews";
import { fetchSingleProductDetails } from "../thunk/products/fetchSignleProductData";
import { updateReview } from "../thunk/products/updateReview";

const initialState = {
  loading: false,
  data: {},
  allReviews: [],
  reviews: { numOfReviews: 0, blocks: 0, reviews: [] },
  reviewsLoader: false,
  reviewDialogOpen: false,
  new_review_loading: false,
  new_review_error: null,
  review_delete_loading: false,
  review_update_loading : false,
  block: 1,
};

const DetailsReducer = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    setBlock: (state = initialState, action) => {
      return {
        ...state,
        block: action.payload,
      };
    },
    toggleReviewDialog: (state = initialState, action) => {
      return {
        ...state,
        reviewDialogOpen: action.payload,
      };
    },
    clearReviews: (state = initialState, action) => {
      return {
        ...state,
        reviews: { ...state.reviews, reviews: [] },
      };
    },
  },
  extraReducers: {
    [fetchSingleProductDetails.pending]: (state = initialState, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [fetchSingleProductDetails.fulfilled]: (state = initialState, action) => {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    },
    [fetchProductReviews.fulfilled]: (state = initialState, action) => {
      let r = [];
      return {
        ...state,
        reviews: {
          blocks: action.payload?.reviews?.blocks,
          numOfReviews: action.payload?.reviews?.numOfReviews,
          reviews:
            state.block === 1
              ? [...action.payload?.reviews?.reviews]
              : action.payload?.role === "get" ? [...state.reviews.reviews, ...action.payload?.reviews?.reviews] :
              [...[...state.reviews.reviews].slice(0, (state.block - 1) * 3), ...action.payload?.reviews?.reviews],
        },
        allReviews: action.payload?.reviews?.allReviews,
        reviewsLoader: false,
      };
    },
    [fetchProductReviews.pending]: (state = initialState, action) => {
      return {
        ...state,
        reviewsLoader: true,
      };
    },
    [createReview.pending]: (state = initialState, action) => {
      return {
        ...state,
        new_review_loading: true,
      };
    },
    [createReview.fulfilled]: (state = initialState, action) => {
      console.log(action.payload);
      return {
        ...state,
        // block : 1,
        new_review_loading: false,
        reviews: {
          ...state.reviews,
           blocks : state.block !== state.blocks ? Math.ceil((state.allReviews.length + 1) / 3) : state.blocks,
          numOfReviews: state.reviews.numOfReviews + 1,
          reviews: [action.payload, ...state.reviews.reviews].slice(
            0,
            state.block === 1 ? 3 : state.reviews.reviews?.length + 1
          ),
        },
        allReviews: [action.payload, ...state.allReviews],
        data: {
          ...state.data,
          rating:
            ([...state.allReviews]?.reduce(
              (acc, rev) => (acc += rev?.rating),
              0
            ) +
              action.payload?.rating) /
            ([...state.allReviews]?.length + 1),
        },
      };
    },
    [deleteReview.pending]: (state = initialState, action) => {
      return {
        ...state,
        review_delete_loading: true,
      };
    },
    [deleteReview.fulfilled]: (state = initialState, action) => {
      const filteredAllReviews = [...state.allReviews].filter(
        (rev) => rev._id !== action.payload?.reviewId
      );
      return {
        ...state,
        review_delete_loading: false,
        reviews: {
          ...state.reviews,
          bloks: Math.ceil(filteredAllReviews.length / 3),
          numOfReviews: state.reviews.numOfReviews - 1,
          reviews: [...state.reviews.reviews]
            .filter((rev) => rev._id !== action.payload?.reviewId)
            .slice(0, state.block === 1 ? 3 : state.reviews.length),
        },
        allReviews: filteredAllReviews,
        data: {
          ...state.data,
          rating:
            filteredAllReviews?.length !== 0
              ? filteredAllReviews.reduce(
                  (acc, rev) => (acc += rev?.rating),
                  0
                ) / filteredAllReviews?.length
              : 0,
        },
      };
    },
    [updateReview.fulfilled] : (state = initialState, action) => {
      const { _id } = action.payload
      const updatedReviews = [...state.reviews.reviews].map((rev) => {
        if(rev._id === _id) {
          return action.payload
        }
        return rev;
      })

      const updatedAllReviews = [...state.allReviews].map((rev) => {
        if(rev._id === _id) {
          return action.payload
        }
        return rev;
      })
      return {
        ...state,
        allReviews : updatedAllReviews,
        reviews : {
          ...state.reviews,
          reviews : updatedReviews
        },
        data: {
          ...state.data,
          rating:
            updatedAllReviews?.length !== 0
              ? updatedAllReviews.reduce(
                  (acc, rev) => (acc += rev?.rating),
                  0
                ) / updatedAllReviews?.length
              : 0,
        },
        review_update_loading : false
      }
    },
    [updateReview.pending] : (state = initialState, action) => {
      return {
        ...state,
        review_update_loading : true
      }
    }
  },
});

export const {
  clearReviews,
  toggleReviewDialog,
  setBlock,
} = DetailsReducer.actions;

export default DetailsReducer.reducer;
