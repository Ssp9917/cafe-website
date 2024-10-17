import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiSlice from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: (userId) => `users/${userId}`,
    }),
    updateUserProfile: builder.mutation({
      query: (userData) => ({
        url: `users/${userData.id}`,
        method: 'PUT',
        body: userData,
      }),
    }),
    // Add more endpoints as needed
  }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = userApiSlice;
