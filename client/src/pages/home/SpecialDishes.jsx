import React, { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import HomeCards from "../../components/HomeCards";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useGetMenuItemsQuery } from "../../api/menuItemApiSlice";

const SpecialDishes = () => {
  const slider = useRef(null);

  // Fetch menu items from the API
  const { data: menuItems, isLoading, error } = useGetMenuItemsQuery();

  
  // Filter the menu items to only include those with specialDishes set to true
  const specialDishes = menuItems?.filter((item) => item.specialDishes === true) || [];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading special dishes.</div>;

  return (
    <div className="section-container my-20 bg-white relative">
      <div className="text-left">
        <p className="subtitle">Special Dishes</p>
        <h2 className="title md:w-[520px] ">Standout Dishes From Our Menu</h2>
      </div>

      {/* Arrow buttons */}
      <div className="md:absolute right-3 top-8 mb-10 md:mr-24">
        <button
          className="btn p-2 rounded-full ml-5 border-none bg-yellow-300 hover:bg-yellow-400"
          onClick={() => slider.current.slickPrev()}
        >
          <FaAngleLeft className="w-8 h-8 p-1" style={{ color: "black" }} />
        </button>

        <button
          className="btn p-2 rounded-full ml-5 border-none bg-yellow-300 hover:bg-yellow-400"
          onClick={() => slider.current.slickNext()}
        >
          <FaAngleRight className="w-8 h-8 p-1" style={{ color: "black" }} />
        </button>
      </div>

      <div className="mt-4 mb-8">
        <Slider ref={slider} {...settings} className="bg-white mt-10 mb-10">
          {specialDishes.length > 0 ? (
            specialDishes.map((item, i) => <HomeCards key={i} item={item} />)
          ) : (
            <div className="text-center">No special dishes available.</div>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default SpecialDishes;
