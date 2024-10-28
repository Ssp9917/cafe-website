import React, { useState, useEffect } from 'react';
import Cards from '../../components/Cards';
import { useGetMenuItemsQuery } from '../../api/menuItemApiSlice';
import LoadingSpinner from '../../components/LoadingSpinner';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  

  // Fetch menu items using Redux Toolkit Query
  const { data: menuData, isLoading, isError, error } = useGetMenuItemsQuery();

  // Update menu state when data changes
  useEffect(() => {
    if (menuData) {
      setMenu(menuData);
      setFilteredItems(menuData);
    }
  }, [menuData]);

  // Handle data filtering by category
  const filterItems = (category) => {
    const filtered = category === 'all' ? menu : menu.filter((item) => item.category === category);
    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Show all items
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory('all');
    setCurrentPage(1);
  };

  // Handle sorting change
  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedItems = [...filteredItems];

    switch (option) {
      case 'A-Z':
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Z-A':
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'low-high':
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render loading, error, or content
  if (isLoading) {
    return <LoadingSpinner/>
  }

  if (isError) {
    return <div className="text-center mt-20 text-red-500">Error: {error?.message || 'Failed to load menu items.'}</div>;
  }

  return (
    <div>
      {/* Menu banner */}
      <div className="section-container mt-20 bg-gradient-to-r menu-background bg-white">
        <div className="py-12 flex flex-col-reverse md:flex-row-reverse justify-between items-center gap-6">
          <div className="w-full md:w-1/2">
            <img src="/menuChef3.png" alt="banner" className="w-full h-auto md:h-[500px] mb-6" />
          </div>
          <div className="w-full md:w-1/2 space-y-7 px-4">
            <div className="rounded-3xl shadow-xl p-6 md:p-8 bg-simpleLightYellow">
              <p className="text-gray-600 mt-4">
                <span className="text-2xl">"</span>
                <span className="text-lg">
                  Welcome to MRKing, your ultimate culinary destination in Sri Lanka! Explore our enticing menu crafted by our talented lady chef, where you can easily browse, sort, and add delectable dishes to your cart for a seamless online ordering experience. Indulge in a symphony of flavors right at your fingertips!
                </span>
                <span className="text-2xl">"</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Shop Section */}
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mt-6 flex-wrap">
          {/* Filtering Buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={showAll} className={`w-24 mr-2 px-4 bg-yellow-200 text-slate-700 py-2 rounded-full shadow-xl hover:shadow-none hover:bg-green-600 transition-all duration-300 ${selectedCategory === 'all' ? 'bg-yellow-300 text-black' : ''}`}>
              All
            </button>
            {['rice', 'kottu', 'burger', 'noodles', 'dessert', 'drinks'].map((category) => (
              <button key={category} onClick={() => filterItems(category)} className={`w-24 mr-2 bg-yellow-200 text-slate-700 px-4 py-2 rounded-full shadow-xl hover:shadow-none hover:bg-green-600 transition-all duration-300 ${selectedCategory === category ? 'bg-yellow-300 text-black' : ''}`}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Sorting Dropdown */}
          <div className="relative w-full md:w-auto mt-4 md:mt-0">
            <select onChange={(e) => handleSortChange(e.target.value)} className="appearance-none w-full md:w-auto text-black px-4 py-2 rounded-full shadow-xl transition-all duration-300 bg-yellow-300 focus:outline-none">
              <option value="default" disabled selected>
                Sort by
              </option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-5 h-5 fill-current text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 12a1 1 0 01-.7-.29l-4-4a1 1 0 111.41-1.42L10 9.17l3.29-3.3a1 1 0 111.42 1.42l-4 4a1 1 0 01-.71.29z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 place-items-center w-full">
          {currentItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)} className={`px-4 py-2 mb-5 rounded-full shadow-xl hover:shadow-none hover:bg-yellow-400 transition-all duration-300 ${currentPage === index + 1 ? 'bg-yellow-300 text-black' : ''}`}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
