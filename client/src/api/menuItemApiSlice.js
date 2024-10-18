import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiSlice from './apiSlice';

export const menuApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all menu items
    getMenuItems: builder.query({
      query: () => 'menuItem/getAllMenuItem',
    }),
    // Get a single menu item by ID
    viewSingleMenu: builder.query({
      query: (id) => `menuItem/getSingleMenuItem/${id}`,
    }),
    // Add a new menu item
    addMenuItems: builder.mutation({
      query: (newMenuItem) => ({
        url: 'menuItem/addMenuItem',
        method: 'POST',
        body: newMenuItem,
      }),
    }),
    // Update an existing menu item by ID
    updateMenuItems: builder.mutation({
      query: ({ id, updatedMenuItem }) => ({
        url: `menuItem/updateMenuItem/${id}`,
        method: 'PUT',
        body: updatedMenuItem,
      }),
    }),
    // Delete a menu item by ID
    deleteMenuItems: builder.mutation({
      query: ({id}) => ({
        url: `menuItem/deleteMenuItem/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks for the API endpoints
export const {
  useGetMenuItemsQuery,
  useViewSingleMenuQuery,
  useAddMenuItemsMutation,
  useUpdateMenuItemsMutation,
  useDeleteMenuItemsMutation,
} = menuApiSlice;
