import { configureStore, combineReducers } from "@reduxjs/toolkit";
import CartReducer from "./reducers/CartReducer";
import DetailsReducer from "./reducers/DetailsReducer";
import OrderReducer from "./reducers/OrderReducer";
import Products from "./reducers/Products";
import ProductsPerCategory from "./reducers/ProductsPerCategory";
import Search from "./reducers/Search";
import ShippingReducer from "./reducers/ShippingReducer";
import UserProfile from "./reducers/UserProfile";
import UserReducer from "./reducers/UserReducer";

const reducers = combineReducers({
    search : Search,
    productsPerCategory : ProductsPerCategory,
    details : DetailsReducer,
    products : Products,
    user : UserReducer,
    userProfile : UserProfile,
    cart : CartReducer,
    shipping : ShippingReducer,
    order : OrderReducer
})

const store = configureStore({
    reducer : reducers
})

store.subscribe(() => {
    localStorage.setItem("cart", JSON.stringify(store.getState()?.cart))
    localStorage.setItem("shipping", JSON.stringify(store.getState()?.shipping))
})

export default store;