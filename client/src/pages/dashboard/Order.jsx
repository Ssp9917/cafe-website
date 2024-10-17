import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Order = () => {
  const [orders, setOrders] = useState([
    {
      transactionId: 'TXN123456',
      createdAt: '2024-10-15T14:32:00Z',
      price: 2500,
      status: 'completed',
    },
    {
      transactionId: 'TXN789012',
      createdAt: '2024-09-20T10:45:00Z',
      price: 1500,
      status: 'pending',
    },
    {
      transactionId: 'TXN345678',
      createdAt: '2024-08-05T18:25:00Z',
      price: 3200,
      status: 'completed',
    },
    {
      transactionId: 'TXN901234',
      createdAt: '2024-07-14T09:15:00Z',
      price: 1800,
      status: 'failed',
    },
    {
      transactionId: 'TXN567890',
      createdAt: '2024-06-30T16:50:00Z',
      price: 2200,
      status: 'completed',
    },
  ]);

  const formatDateTime = (dateTimeString) => {
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateTimeString).toLocaleTimeString(undefined, options);
  };

  const renderTable = () => {
    return (
      <div className="section-container bg-white min-h-screen overflow-x-auto">
        <div className="max-w-screen-2xl mx-auto xl:px-8 pt-20 pb-16">
          <h2 className="text-2xl text-center text-slate-700 font-semibold mb-4">Order History</h2>
          <table className="min-w-full bg-simpleLightYellow border border-gray-300 shadow-xl">
            <thead>
              <tr className="bg-yellow-200 text-slate-700">
                <th className="border-b p-2">Date</th>
                <th className="border-b p-2">Time</th>
                <th className="border-b p-2">Transaction ID</th>
                <th className="border-b p-2">Price</th>
                <th className="border-b p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                <tr key={item.transactionId} className="text-center text-slate-600">
                  <td className="border-b p-2">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="border-b p-2">{formatDateTime(item.createdAt)}</td>
                  <td className="border-b p-2">{item.transactionId}</td>
                  <td className="border-b p-2">Rs .{item.price}</td>
                  <td className={`border-b p-2 ${item.status === 'completed' ? 'text-green-500' : item.status === 'pending' ? 'text-orange-500' : 'text-red-500'}`}>
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <Link to="/contact-us">
              <button className="bg-yellow-300 text-slate-700 text-base py-2 px-4 rounded">Contact Us</button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto mt-8">
      {orders.length > 0 ? renderTable() : <p>No orders found.</p>}
    </div>
  );
};

export default Order;
