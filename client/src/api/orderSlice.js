import apiSlice from './apiSlice';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users 
    getAllOrders: builder.query({
      query: () => '/order/getAllOrder',
    }),

    // add a order
    addOrder:builder.mutation({
        query: (order) => ({
            url: 'order/create-order',
            method: 'POST',
            body: order,
          }),
    })

  }),
});

export const {useGetAllOrdersQuery,useAddOrderMutation} = orderApiSlice;
