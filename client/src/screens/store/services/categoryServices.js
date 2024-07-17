import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryService = createApi({
  reducerPath: 'category',
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
    create: builder.mutation({
      query: (name) => ({
        url: 'create-category',
        method: 'POST',
        body: name,
      }),
    }),
    getCategories: builder.query({
      query: (page) => ({
        url: `categories/${page}`,
        method: 'GET'
      }),
    }),
  }),
});

export const { useCreateMutation, useGetCategoriesQuery } = categoryService;
export default categoryService;
