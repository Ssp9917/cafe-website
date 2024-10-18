import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useForm } from 'react-hook-form';
import { FaUserCircle } from 'react-icons/fa';
import { useUpdateUserProfileMutation } from '../../api/userApiSlice';
import axios from 'axios';

const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [updateUserProfile, { isLoading, error }] = useUpdateUserProfileMutation();

    const onSubmit = async (data) => {
        const userData = {
            id: user._id,
            name: data.name,
            profileImage: data.profileImage[0], // Assuming this is an array
        };

        try {
            await updateUserProfile(userData).unwrap();
            alert("Profile updated successfully");
        } catch (err) {
            console.error("Failed to update profile: ", err);
        }
    };


    return (
        <div className="min-h-screen mt-12 flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <p className="text-3xl font-semibold text-center mb-6 text-gray-800">User Profile</p>
                <div className="text-center mb-4">
                    {user && user.profileImage ? (
                        <img
                            className="w-24 h-24 mx-auto rounded-full"
                            src={user.profileImage}
                            alt="User avatar"
                        />
                    ) : (
                        <div className="w-20 h-20 mx-auto flex items-center justify-center text-yellow-300 mb-2 text-xl rounded-full bg-yellow-100">
                            <FaUserCircle />
                        </div>
                    )}
                    <h2 className="mt-4 text-xl font-semibold text-gray-800">{user.name}</h2>
                </div>
                <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                        <label className="block text-gray-600 text-sm font-semibold">Name</label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Your name"
                            className="mt-1 p-2 w-full rounded-lg border-gray-300 bg-yellow-100 focus:ring focus:ring-blue-200"
                        />
                        {errors.name && <span className="text-red-500">Name is required</span>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 text-sm font-semibold">Upload Photo</label>
                        <input
                            type="file"
                            {...register("profileImage")}
                            className="mt-1 w-full text-sm text-gray-500 border rounded-lg bg-yellow-100 py-2 px-4 focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-yellow-300 text-base hover:bg-yellow-400 text-slate-700 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                            disabled={isLoading} // Disable button while loading
                        >
                            {isLoading ? "Updating..." : "Update"}
                        </button>
                    </div>
                    {error && <span className="text-red-500">Failed to update profile: {error.message}</span>}
                </form>
            </div>
        </div>
    );
};

export default UserProfile;
