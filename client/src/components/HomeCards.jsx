import React, { useState } from "react";

const HomeCards = ({item}) => {
    const { name, image, price, recipe, _id } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  // Handlers for button actions
  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleAddToCart = () => {
    console.log("Item added to cart!");
  };

  return (
    <div className="bg-cardYellow rounded-lg overflow-hidden shadow-2xl max-w-xs mx-auto mb-6 mt-4">
      <div className="relative">
        <img
          src={image}
          alt={name}
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
        <h2 className="text-lg text-slate-700 font-semibold mb-2">{name}</h2>
        <p className="text-gray-600 mb-4">{recipe}</p>
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-orange-800">${price}</span>
          <button
            onClick={handleAddToCart}
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
