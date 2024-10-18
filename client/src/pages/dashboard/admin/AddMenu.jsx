import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUtensils } from "react-icons/fa";
import { useAddMenuItemsMutation } from '../../../api/menuItemApiSlice';
import Swal from 'sweetalert2';

const AddMenu = () => {
    const { register, handleSubmit, reset } = useForm();
    const [addMenuItem, { isLoading }] = useAddMenuItemsMutation();
    const [isSpecialDish, setIsSpecialDish] = useState(false); // State for the toggle button

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("recipeName", data.recipeName);
            formData.append("category", data.category);
            formData.append("price", data.price);
            formData.append("recipeDetails", data.recipeDetails);
            formData.append("image", data.image[0]); // Assuming image is a file input
            formData.append("specialDishes", isSpecialDish); // Add specialDishes field

            // Call the mutation function to add the menu item
            await addMenuItem(formData).unwrap();

            // Show a success message with SweetAlert2
            Swal.fire({
                title: 'Success!',
                text: 'Menu item added successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            // Reset the form fields
            reset();
            setIsSpecialDish(false); // Reset the toggle button state

        } catch (error) {
            // Show an error message if something goes wrong
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add menu item.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };

    return (
        <div className="w-full md:w-[870px] mt-4 px-4 mx-auto">
            <div className="bg-stone-950 rounded-2xl mt-4 px-4 py-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-3xl text-white text-center font-semibold mt-4">
                        Upload A New <span className="text-yellow-600">Menu Item</span>
                    </h2>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-slate-500 text-base font-bold">Recipe Name*</span>
                        </label>
                        <input
                            type="text"
                            {...register("recipeName", { required: true })}
                            placeholder="Recipe Name"
                            className="input bg-white text-slate-600 input-bordered w-full border-2 border-slate-300"
                        />
                    </div>

                    {/* 2nd row */}
                    <div className="flex items-center gap-4">
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text text-slate-500 text-base font-bold">Category*</span>
                            </label>
                            <select
                                {...register("category", { required: true })}
                                className="select select-bordered text-slate-600 bg-white border-2 border-slate-300"
                                defaultValue="default"
                            >
                                <option disabled value="default">Select a category</option>
                                <option value="rice">Rice</option>
                                <option value="kottu">Kottu</option>
                                <option value="burger">Burger</option>
                                <option value="noodles">Noodles</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                                <option value="popular">Popular</option>
                            </select>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-slate-500 text-base font-bold">Price*</span>
                            </label>
                            <input
                                type="number"
                                {...register("price", { required: true })}
                                placeholder="Price"
                                className="input input-bordered w-full text-slate-600 bg-white border-2 border-slate-300"
                            />
                        </div>
                    </div>

                    {/* 3rd row */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-slate-500 text-base font-bold">Recipe Details</span>
                        </label>
                        <textarea
                            {...register("recipeDetails", { required: true })}
                            className="textarea textarea-bordered h-24 bg-white text-slate-600 border-2 border-slate-300"
                            placeholder="Tell the world about your recipe"
                        ></textarea>
                    </div>

                    {/* Toggle Button for Special Dish */}
                    <div className="flex items-center gap-4 my-6">
                        <label className="label">
                            <span className="label-text text-slate-500 text-base font-bold">Mark as Special Dish</span>
                        </label>
                        <input
                            type="checkbox"
                            checked={isSpecialDish}
                            onChange={() => setIsSpecialDish(!isSpecialDish)}
                            className="toggle toggle-accent"
                        />
                    </div>

                    {/* 4th row */}
                    <div className="form-control w-full my-6">
                        <input
                            {...register("image", { required: true })}
                            type="file"
                            className="file-input w-full max-w-xs bg-white border-2 border-slate-300"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn bg-myHoverYellow hover:bg-mYyellow text-slate-700 px-6 border-none"
                        disabled={isLoading}
                    >
                        Add Item <FaUtensils />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMenu;
