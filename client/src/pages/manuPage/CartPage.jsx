import React, { useContext } from 'react';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} from '../../features/cart/cartSlice';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  // Calculate price for each item
  const calculatePrice = (item) => item.price * item.quantity;

  // Calculate total price
  const cartSubTotal = cartItems.reduce((total, item) => total + calculatePrice(item), 0);
  const orderTotal = cartSubTotal;

  // Handle item removal
  const handleDelete = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeItemFromCart(item));
        Swal.fire('Deleted!', 'Item has been removed from the cart.', 'success');
      }
    });
  };

  // Handle quantity increase
  const handleIncrease = (item) => {
    dispatch(increaseItemQuantity(item));
  };

  // Handle quantity decrease
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseItemQuantity(item));
    } else {
      Swal.fire('Quantity Alert', 'Cannot decrease quantity below 1', 'warning');
    }
  };

  // Handle place order
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      Swal.fire('Cart is Empty', 'Please add items to your cart before placing an order.', 'warning');
    } else {
      window.location.href = '/process-checkout';
    }
  };

  return (
    <div className="section-container menu-background min-h-screen">
      <div className="max-w-screen-2xl mx-auto xl:px-8 pt-20 pb-16">
        <div className="bg-gradient-to-r mt-10 bg-simpleLightYellow shadow-lg rounded-3xl p-4 md:p-8">
          <div className="mb-4 md:mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Items Added To The <span className="text-green-500">Cart</span>
            </h2>
          </div>
          <div className="overflow-x-auto mb-8 mt-8 md:mb-8 rounded-2xl shadow-xl border-none">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-yellow-300 text-gray-800">
                <tr>
                  <th className="py-2 hidden sm:table-cell">Food</th>
                  <th className="py-2">Item Name</th>
                  <th className="py-2">Quantity</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="py-2 hidden sm:table-cell">
                      <div className="flex items-center justify-center">
                        <img
                          src={`${import.meta.env.VITE_BACKEND_BASE_URL}/${item.image}`}
                          alt="item image"
                          className="w-12 h-12 object-cover rounded-full shadow-md"
                        />
                      </div>
                    </td>
                    <td className="py-2 text-center text-slate-600">{item.recipeName}</td>
                    <td className="py-2">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          className="btn btn-ghost btn-sm text-red hover:bg-red-100"
                          onClick={() => handleDecrease(item)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="w-12 text-center bg-white border text-slate-600 border-gray-300"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          className="btn btn-ghost btn-sm text-green hover:bg-green-100"
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-2 text-center text-slate-600">
                    ₹{calculatePrice(item).toFixed(2)}
                    </td>
                    <td className="py-2 text-center">
                      <button
                        className="btn btn-ghost btn-xs text-red hover:bg-red-100"
                        onClick={() => handleDelete(item)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 shadow-xl">
            <div className="bg-gray-50 p-4 md:p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-2 md:mb-4 text-slate-600">Customer details</h3>
              {user ? (
                <>
                  <p className="mb-2 text-slate-500">Name: {user.name}</p>
                  <p className="mb-2 text-slate-500">Email: {user.email}</p>
                </>
              ) : (
                <p className="mb-2 text-slate-500">Please Login</p>
              )}
            </div>
            <div className="bg-gray-50 p-4 md:p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-semibold mb-2 md:mb-4 text-slate-600">Shopping details</h3>
              <p className="mb-2 text-slate-500">Total Items: {cartItems.length}</p>
              <p className="mb-2 text-slate-500">Total Price: RS.{orderTotal.toFixed(2)}</p>
              <button
                className="btn bg-yellow-300 hover hover:bg-yellow-400 border-none mt-2 md:mt-4 text-slate-700"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
