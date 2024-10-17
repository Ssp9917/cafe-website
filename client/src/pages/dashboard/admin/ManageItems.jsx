import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageItems = () => {
    // Dummy menu data
    const [menu, setMenu] = useState([
        {
            _id: "1",
            image: "https://via.placeholder.com/150",
            name: "Cheese Pizza",
            price: 12.99,
        },
        {
            _id: "2",
            image: "https://via.placeholder.com/150",
            name: "Spaghetti Bolognese",
            price: 14.99,
        },
        {
            _id: "3",
            image: "https://via.placeholder.com/150",
            name: "Caesar Salad",
            price: 9.99,
        },
        {
            _id: "4",
            image: "https://via.placeholder.com/150",
            name: "Grilled Chicken Sandwich",
            price: 11.99,
        },
        {
            _id: "5",
            image: "https://via.placeholder.com/150",
            name: "Chocolate Milkshake",
            price: 6.99,
        },
    ]);

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                setMenu(menu.filter((menuItem) => menuItem._id !== item._id));
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                });
            }
        });
    };

    return (
        <div className="w-full md:w-[870px] h-screen px-4 mx-auto">
            <div className="bg-stone-950 rounded-2xl mt-4 px-4 py-4">
                <h2 className="text-3xl mb-4 text-center font-semibold mt-6 text-white">
                    Manage All <span className="text-yellow-600">Menu Items</span>
                </h2>
                <div className="scrollbar-yellow" style={{ maxHeight: "450px", overflowY: "scroll" }}>
                    <table className="table">
                        <thead>
                            <tr className="bg-gray-900 text-white">
                                <th>#</th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody className="text-white">
                            {menu.map((item, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>
                                        <Link to={`/dashboard/update-menu/${item._id}`}>
                                            <button className="btn btn-ghost btn-xs bg-orange-500 text-white">
                                                <FaEdit />
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteItem(item)}
                                            className="btn btn-ghost btn-xs text-red"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;
