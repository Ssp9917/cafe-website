import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiSlice from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users 
    getAllUsers: builder.query({
      query: () => 'auth/getAllUser',
    }),

    updateUserProfile: builder.mutation({
      query: (userData) => ({
        url: `auth/users/${userData.id}`,
        method: 'PUT',
        body: userData,
      }),
    }),

    deleteUser: builder.mutation({
      query : ({id}) => ({
        url:`auth/deleteUsers/${id}`,
        method:'DELETE'
      })
    })
    // Add more endpoints as needed
  }),
});

export const {useGetAllUsersQuery, useUpdateUserProfileMutation,useDeleteUserMutation } = userApiSlice;
