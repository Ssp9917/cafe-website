import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5001/api/',
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
