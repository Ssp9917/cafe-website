import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiSlice from './apiSlice';

export const menuApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenuItems: builder.query({
      query: () => 'menuItem',
    }),
    // Add more endpoints as needed
  }),
});

export const { useGetMenuItemsQuery } = menuApiSlice;
