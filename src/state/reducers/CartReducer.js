const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))?.cartItems
    : [],
  totalSum: !localStorage.getItem("cart")?.totalSum
    ? JSON.parse(localStorage.getItem("cart"))?.cartItems?.reduce(
        (acc, product) => (acc += product?.totalSum),
        0
      )
    : localStorage.getItem("cart")?.totalSum,
};

const CartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart : () => {
      localStorage.removeItem("cart")
       return {
         cartItems : [],
         totalSum : 0
       }
    },
    addItemToCart: (state = initialState, action) => {
      const cartItemsData = [{...action.payload, stock : action.payload?.stock - 1}, ...state.cartItems];
      return {
        ...state,
        cartItems: cartItemsData,
        totalSum: cartItemsData.reduce(
          (acc, product) => (acc += product?.totalSum),
          0
        ),
      };
    },
    removeItem: (state = initialState, action) => {
      console.log(action.payload)
      const filteredCartItems = [...state.cartItems].filter(
        (product) => product.id !== action.payload.id
      );
      console.log(filteredCartItems)
      return {
        ...state,
        cartItems: [...state.cartItems].filter(
          (product) => product.id !== action.payload.id
        ),
        totalSum: filteredCartItems.reduce(
          (acc, product) => (acc += product?.totalSum),
          0
        ),
      };
    },
    increaseQuantity: (state = initialState, action) => {
      const { id } = action.payload;
      const cartItemArr = [...state.cartItems].map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity + 1,
            totalSum: product?.price * (product.quantity + 1),
          };
        } else {
          return product;
        }
      });

      return {
        ...state,
        cartItems: cartItemArr,
        totalSum: cartItemArr.reduce(
          (acc, product) => (acc += product?.totalSum),
          0
        ),
      };
    },
    decreaseQuantity: (state = initialState, action) => {
      const { id } = action.payload;
      const cartItemsArr = [...state.cartItems].map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity - 1,
            totalSum: product?.price * (product.quantity - 1),
          };
        } else {
          return product;
        }
      });

      return {
        ...state,
        cartItems: cartItemsArr,
        totalSum: cartItemsArr.reduce(
          (acc, product) => (acc += product?.totalSum),
          0
        ),
      };
    }
  },
});

export const { addItemToCart, removeItem, increaseQuantity, decreaseQuantity, clearCart } = CartReducer.actions;

export default CartReducer.reducer;