import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productService = createApi({
  reducerPath: 'products',
  tagTypes: ['products'], // TagTypes array should be an array of strings
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
        url: 'create-product',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['products'],
    }),
    getProducts: builder.query({
      query: (page) => ({
        url: `products/${page}`,
        method: 'GET',
      }),
      providesTags: ['products'],
    }),
    getProduct: builder.query({
      query: id => {
      return {
          url: `/product/${id}`,
          method: 'GET'
      }
      },
      providesTags: ['products']
  }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: '/product',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['products'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['products'],
    }),
  }),
});

export const { 
  useCreateProductMutation, 
  useGetProductQuery, 
  useGetProductsQuery,
  useUpdateProductMutation,  // Export the new hook
  useDeleteProductMutation 
} = productService;

export default productService;
