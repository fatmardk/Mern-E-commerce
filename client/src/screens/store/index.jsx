import { configureStore } from "@reduxjs/toolkit";
import authService from "./services/authService";
import authReducer from "./reducers/authReducer";
import categoryService from "./services/categoryService";
import globalReducer from "./reducers/globalReducer";
import productService from "./services/productService";
import homeProducts from "./services/homeProducts"

export const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    [productService.reducerPath]: productService.reducer,
    [homeProducts.reducerPath]: homeProducts.reducer,
    authReducer,
    globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authService.middleware,
      categoryService.middleware,
      productService.middleware,
      homeProducts.middleware
    ),
});

export default store;
