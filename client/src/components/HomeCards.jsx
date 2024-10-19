import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../features/cart/cartSlice";

const HomeCards = ({ item }) => {
  const { recipeName, image, price, recipeDetails, _id } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const BackendUrl = import.meta.env.VITE_BACKEND_BASE_URL;

  // Handlers for button actions
  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addItemToCart(item));
  };

  return (
    <div className="bg-cardYellow  rounded-lg overflow-hidden shadow-2xl max-w-xs mx-auto mb-6 mt-4">
      <div className="relative">
        <img
          src={BackendUrl +'/'+image}
          alt={recipeName}
          className="w-full h-40 object-cover object-center"
        />
        <button
          onClick={handleHeartClick}
          className="absolute top-2 right-2 text-red-500"
        >
          {isHeartFilled ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-lg text-slate-700 font-semibold mb-2">{recipeName}</h2>
        <p className="text-gray-600 mb-4">{recipeDetails}</p>
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-orange-800">₹ {price}</span>
          <button
            onClick={() => handleAddToCart(item)}
            className="bg-yellow-300 hover:bg-mYyellow text-black font-bold py-1 px-3 rounded-full"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeCards;
