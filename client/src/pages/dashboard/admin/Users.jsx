import React, { useState, useEffect, useContext } from 'react';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserProfileMutation } from '../../../api/userApiSlice';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../context/AuthProvider';

const Users = () => {
    // Fetching users from the API
    const { data: usersData, isLoading, isError, error, refetch } = useGetAllUsersQuery();
    const [users, setUsers] = useState([]);
    const [updateUserProfile, { isLoading: isUpdating, isError: isUpdatingError }] = useUpdateUserProfileMutation();
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
    const {user:currentUser} = useContext(AuthContext)
    // Update the local state when the API data changes
    useEffect(() => {
        if (usersData) {
            setUsers(usersData);
        }
    }, [usersData]);

    const handleMakeAdmin = async (user) => {
        console.log(user);

        // Determine the new role
        const newRole = user.role === 'admin' ? 'user' : 'admin';

        try {
            await updateUserProfile({ id: user._id, role: newRole }).unwrap();
            refetch();

            // Show a success message with SweetAlert2
            Swal.fire({
                title: 'Success!',
                text: `User role updated to ${newRole}.`,
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } catch (error) {
            console.error('Failed to update role:', error);
        }
    };
    console.log(currentUser)

    // Handle deleting a user
    const handleDeleteUser = async (user) => {
        // Check if the current user is an admin
        console.log(currentUser)
        if (currentUser.role !== 'admin') {
            Swal.fire({
                title: 'Error!',
                text: 'You do not have permission to delete users.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        // Confirm deletion with SweetAlert2
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this user?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel',
        });

        if (result.isConfirmed) {
            try {
                await deleteUser(user._id).unwrap();
                refetch();

                // Show a success message
                Swal.fire({
                    title: 'Deleted!',
                    text: 'User deleted successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            } catch (error) {
                console.error('Failed to delete user:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to delete the user.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        }
    };

    // Display loading state
    if (isLoading) {
        return (
            <div className="text-center text-white">
                <p>Loading users...</p>
            </div>
        );
    }

    // Display error state
    if (isError) {
        return (
            <div className="text-center text-red-500">
                <p>Error loading users: {error?.message || 'An error occurred'}</p>
            </div>
        );
    }

    return (
        <div className="w-full md:w-[900px] px-4 mx-auto">
            <div className="bg-stone-950 rounded-2xl mt-4 px-4 py-4">
                {/* Header */}
                <h1 className="text-4xl font-bold text-center text-white">Users</h1>

                <h5 className="text-2xl font-bold mb-4 text-white">
                    Total Users: {users.length}
                </h5>

                {/* Updating Loading State for Role Update */}
                {isUpdating && <p className="text-yellow-500">Updating user role...</p>}
                {isDeleting && <p className="text-yellow-500">Deleting user...</p>}
                {isUpdatingError && (
                    <p className="text-red-500">Error updating role: {isUpdatingError?.message || 'An error occurred'}</p>
                )}

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
                        <tbody className="text-white">
                            {users.map((user, index) => (
                                <tr key={user._id} className={index % 2 === 0 ? 'bg-stone-950' : ''}>
                                    <td className="py-3 px-6">{index + 1}</td>
                                    <td className="py-3 px-6">{user.name}</td>
                                    <td className="py-3 px-6">{user.email}</td>
                                    <td className="py-3 px-6">
                                        {user.role === 'admin' ? (
                                            <span
                                                onClick={() => handleMakeAdmin(user)}
                                                className="bg-indigo-500 cursor-pointer text-white py-1 px-2 rounded-full">Admin</span>
                                        ) : (
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="bg-indigo-500 text-white py-1 px-2 rounded-full"
                                                disabled={isUpdating} // Disable button while updating
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
