import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authService = createApi({
  reducerPath: 'authService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/',
  }),
  endpoints: (builder) => ({
    authLogin: builder.mutation({
      query: (loginData) => ({
        url: 'login',
        method: 'POST',
        body: loginData,
      }),
    }),
    userRegister: builder.mutation({
      query : data => {
       return{
        url: '/register',
        method: 'POST',
        body: data
       }
      }
    })
  }),
});

export const { useAuthLoginMutation, useUserRegisterMutation } = authService;

export default authService;
