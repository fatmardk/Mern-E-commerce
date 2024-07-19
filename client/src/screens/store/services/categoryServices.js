import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryService = createApi({
  reducerPath: 'category',
  tagTypes: ['categories'],
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
      invalidatesTags: ['categories'],
    }),

    updateCategory: builder.mutation({
      query: (data) => ({
        url: `update-category/${data.id}`,
        method: 'PUT',
        body: { name: data.name },
      }),
      invalidatesTags: ['categories'],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `delete-category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['categories'],
    }),

    getCategories: builder.query({
      query: (page) => `categories/${page}`,
      providesTags: ['categories'],
    }),

    fetchCategory: builder.query({
      query: (id) => ({
        url: `fetch-category/${id}`,
        method: 'GET',
      }),
      providesTags: ['categories'],
    }),

    allCategories: builder.query({
      query: () => ({
        url: 'allcategories',
        method: 'GET',
      }),
      providesTags: ['categories'],
    }),
  }),
});

export const {
  useCreateMutation,
  useGetCategoriesQuery,
  useFetchCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAllCategoriesQuery,
} = categoryService;

export default categoryService;
