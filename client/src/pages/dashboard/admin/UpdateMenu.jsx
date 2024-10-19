import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useViewSingleMenuQuery } from "../../../api/menuItemApiSlice";
import { FaUtensils } from "react-icons/fa";
import { useUpdateMenuItemsMutation } from "../../../api/menuItemApiSlice"; // Assuming your RTK Query is set up

const UpdateMenu = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: item } = useViewSingleMenuQuery(id);

  // RTK Query mutation hook for updating a menu item
  const [updateMenuItems, { isLoading, isError, isSuccess, error }] =
    useUpdateMenuItemsMutation();

  // Pre-fill the form fields with existing data
  useEffect(() => {
    if (item) {
      setValue("recipeName", item.recipeName);
      setValue("category", item.category);
      setValue("price", item.price);
      setValue("recipeDetails", item.recipeDetails);
    }
  }, [item, setValue]);

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      // Preparing the form data
      const formData = new FormData();
      formData.append("recipeName", data.recipeName);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("recipeDetails", data.recipeDetails);
      if (data.image[0]) {
        formData.append("image", data.image[0]);
      }

      // Making the API request to update the menu item
      await updateMenuItems({ id: item._id, updatedMenuItem:formData });

      // Reset form after successful update
      reset();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // Use effects for handling the different states
  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Menu item updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/manage-items");
    }
    if (isError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.data?.message || "Something went wrong!",
      });
    }
  }, [isSuccess, isError, navigate, error]);

  return (
    <div className="w-full md:w-[870px] mt-4 px-4 mx-auto">
      <div className="bg-stone-950 rounded-2xl mt-4 px-4 py-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-3xl text-slate-500 text-center font-semibold mt-4">
            Update <span className="text-yellow-600">Menu Item</span>
          </h2>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              {...register("recipeName", { required: true })}
              placeholder="Recipe Name"
              className="input input-bordered w-full"
            />
          </div>

          {/* 2nd row */}
          <div className="flex items-center gap-4">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
              >
                <option disabled value="default">
                  Select a category
                </option>
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
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
              {...register("recipeDetails", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Tell the world about your recipe"
            ></textarea>
          </div>

          {/* 4th row */}
          <div className="form-control w-full my-6">
            <input
              {...register("image")}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button
            className={`btn bg-myHoverYellow hover:bg-mYyellow text-slate-700 px-6 ${
              isLoading ? "loading" : ""
            }`}
            disabled={isLoading}
          >
            Update Item <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenu;
