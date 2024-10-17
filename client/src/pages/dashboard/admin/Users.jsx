import React, { useState } from 'react';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';

const Users = () => {
    // Dummy user data
    const [users, setUsers] = useState([
        {
            _id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'user',
        },
        {
            _id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'admin',
        },
        {
            _id: '3',
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            role: 'user',
        },
        {
            _id: '4',
            name: 'Bob Brown',
            email: 'bob.brown@example.com',
            role: 'user',
        },
        {
            _id: '5',
            name: 'Charlie Davis',
            email: 'charlie.davis@example.com',
            role: 'admin',
        },
    ]);

    const handleMakeAdmin = (user) => {
        const updatedUsers = users.map((u) =>
            u._id === user._id ? { ...u, role: 'admin' } : u
        );
        setUsers(updatedUsers);
    };

    const handleDeleteUser = (user) => {
        const filteredUsers = users.filter((u) => u._id !== user._id);
        setUsers(filteredUsers);
    };

    return (
        <div className="w-full md:w-[900px] px-4 mx-auto">
            <div className="bg-stone-950 rounded-2xl mt-4 px-4 py-4">
                {/* header */}
                <h1 className="text-4xl font-bold text-center text-white">Users</h1>

                <h5 className="text-2xl font-bold mb-4 text-white">Total Users: {users.length}</h5>

                <div className="overflow-x-auto">
                    <table className="border border-gray-300 w-full rounded-md">
                        <thead className="bg-yellow-300 text-slate-700">
                            <tr>
                                <th className="py-3 px-6 text-left">ID</th>
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Role</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-white'>
                            {users.map((user, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-stone-950' : ''}>
                                    <td className="py-3 px-6">{index + 1}</td>
                                    <td className="py-3 px-6">{user.name}</td>
                                    <td className="py-3 px-6">{user.email}</td>
                                    <td className="py-3 px-6">
                                        {user.role === 'admin' ? (
                                            <span className="bg-indigo-500 text-white py-1 px-2 rounded-full">
                                                Admin
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="bg-indigo-500 text-white py-1 px-2 rounded-full"
                                            >
                                                <FaUsers />
                                            </button>
                                        )}
                                    </td>
                                    <td className="py-3 px-6">
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="bg-orange-500 text-white py-1 px-2 rounded-full"
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

export default Users;
