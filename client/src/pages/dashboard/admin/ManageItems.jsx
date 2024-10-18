import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useGetMenuItemsQuery, useDeleteMenuItemsMutation } from "../../../api/menuItemApiSlice";

const ManageItems = () => {
  const [menu, setMenu] = useState([]);

  // Fetch menu items using Redux Toolkit Query
  const { data: menuData, isLoading, isError, error } = useGetMenuItemsQuery();

  // Delete menu item mutation
  const [deleteMenuItems] = useDeleteMenuItemsMutation();

  // Update menu state when data changes
  useEffect(() => {
    if (menuData) {
      setMenu(menuData);
    }
  }, [menuData]);

  const BackendUrl = import.meta.env.VITE_BACKEND_BASE_URL;

  

  // Handle deletion of menu items
  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
        console.log(result)
      if (result.isConfirmed) {
        try {
          // Perform deletion via mutation
          await deleteMenuItems(item._id).unwrap();

          Swal.fire({
            title: "Deleted!",
            text: "The item has been deleted.",
            icon: "success",
          });
        } catch (error) {
          // Handle error if deletion fails
          Swal.fire({
            title: "Error!",
            text: error?.data?.message || "Failed to delete the item.",
            icon: "error",
          });
        }
      }
    });
  };

  // Loading state
  if (isLoading) {
    return <div className="text-center text-white">Loading menu items...</div>;
  }

  // Error state
  if (isError) {
    return <div className="text-center text-red-500">Error: {error?.message || "Failed to load menu items."}</div>;
  }

  return (
    <div className="w-full md:w-[870px] h-screen px-4 mx-auto">
      <div className="bg-stone-950 rounded-2xl mt-4 px-4 py-4">
        <h2 className="text-3xl mb-4 text-center font-semibold mt-6 text-white">
          Manage All <span className="text-yellow-600">Menu Items</span>
        </h2>
        <div
          className="scrollbar-yellow"
          style={{ maxHeight: "450px", overflowY: "scroll" }}
        >
          <table className="table-auto w-full text-left">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="p-2">#</th>
                <th className="p-2">Image</th>
                <th className="p-2">Item Name</th>
                <th className="p-2">Price</th>
                <th className="p-2">Edit</th>
                <th className="p-2">Delete</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {menu.map((item, index) => (
                <tr key={item._id} className="border-b border-gray-700">
                  <th className="p-2">{index + 1}</th>
                  <td className="p-2">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={BackendUrl+item.image} alt={item.recipeName} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-2">{item.recipeName}</td>
                  <td className="p-2">${item.price}</td>
                  <td className="p-2">
                    <Link to={`/dashboard/update-menu/${item._id}`}>
                      <button className="btn btn-ghost btn-xs bg-orange-500 text-white">
                        <FaEdit />
                      </button>
                    </Link>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDeleteItem(item)}
                      className="btn btn-ghost btn-xs text-red-500"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {menu.length === 0 && (
            <div className="text-center text-white mt-4">No menu items available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
