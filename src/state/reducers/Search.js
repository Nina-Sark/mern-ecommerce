import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  focused: false,
  dialogOpen : false,
  searchCategory: "",
  searchKeyword: "",
  scrollPosition : 0,
  searchResult : []
};

const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearchData : (state = initialState, action) => {
        return {
            ...state,
            searchCategory : "",
            searchKeyword : "",
            searchResult : []
        }
    },
    handleFocus: (state = initialState, action) => {
        return {
            ...state,
            focused : action.payload
        }
    },
    getSearchCategory : (state = initialState, action) => {
        return {
            ...state,
            searchCategory : action.payload
        }
    },
    getSearchKeyword : (state = initialState, action) => {
        return {
            ...state,
            searchKeyword : action.payload
        }
    },
    toggleDialog : (state = initialState, action) => {
        return {
            ...state,
            dialogOpen : action.payload
        }
    },
    getScrollPosition : (state = initialState, action) => {
        return {
            ...state,
            scrollPosition : action.payload
        }
    }
  },
});

export const { handleFocus, getSearchCategory, getSearchKeyword, toggleDialog, getScrollPosition, clearSearchData } = SearchSlice.actions;

export default SearchSlice.reducer