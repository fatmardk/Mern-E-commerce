import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productService = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.authReducer?.adminToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: 'create-product', // Leading slash is not needed
        method: 'POST',
        body: data,
      }),
    }),
    getProduct: builder.query({
      query: (page) => ({
        url: `products/${page}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateProductMutation, useGetProductQuery } = productService;

export default productService;
