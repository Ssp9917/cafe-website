import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiSlice from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users 
    getAllUsers: builder.query({
      query: () => 'auth/getAllUser',
    }),

    getUserProfile: builder.query({
      query: (userId) => `auth/${userId}`,
    }),

    updateUserProfile: builder.mutation({
      query: (userData) => ({
        url: `auth/users/${userData.id}`,
        method: 'PUT',
        body: userData,
      }),
    }),
    // Add more endpoints as needed
  }),
});

export const {useGetAllUsersQuery,useGetUserProfileQuery, useUpdateUserProfileMutation } = userApiSlice;
