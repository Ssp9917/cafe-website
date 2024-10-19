import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BackendLiveUrl = import.meta.env.VITE_BACKEND_BASE_URL

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BackendLiveUrl}/api/`,
    prepareHeaders: (headers, { getState }) => {
      console.log('prepareHeaders is called');
      const token = getState().auth.token; // Fetch the token from state
      console.log(getState())
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      console.log('Authorization Header:', headers.get('Authorization'));

      return headers;
    },
  }),

  endpoints: (builder) => ({}),
});

export default apiSlice;
