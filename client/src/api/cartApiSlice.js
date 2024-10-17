import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiSlice from './apiSlice';

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query({
      query: (userId) => `cart/${userId}`,
    }),
    addToCart: builder.mutation({
      query: (item) => ({
        url: 'cart',
        method: 'POST',
        body: item,
      }),
    }),
    // Add more endpoints as needed
  }),
});

export const { useGetCartItemsQuery, useAddToCartMutation } = cartApiSlice;
