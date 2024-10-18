import React from "react";

const Cards = ({item}) => {

  console.log(item)

    const { recipeName, image, price, recipeDetails, _id } = item;

  return (
    <div className="bg-cardYellow rounded-lg shadow-2xl hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
      <div className="flex justify-center items-center">
        <img
          src={`http://localhost:5001/${image}`}
          alt={name}
          className="w-[300px] mt-3 h-48 rounded-t-lg"
        />
      </div>
      <div className="p-3">
        <h3 className="text-xl  text-gray-900">{recipeName}</h3>
        <p className=" mt-2  text-xs text-gray-500  h-20 overflow-hidden">
          {recipeDetails}
        </p>
        <div className="flex items-center justify-between ">
          <div className="flex items-center">
            <button
              className="bg-yellow-300 hover:bg-mYyellow text-black font-bold py-1 px-3 rounded-full mt-2"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
          </div>
          <p className=" text-base font-bold  text-orange-800 mr-2">
            Rs.{price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
