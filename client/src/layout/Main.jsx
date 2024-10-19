import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '../components';
import LoadingSpinner from '../components/LoadingSpinner';
import { AuthContext } from '../context/AuthProvider';

const Main = () => {
  const { loading } = useContext(AuthContext);

  return (
    <div className="bg-white h-full">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-screen-2xl mx-auto">
          <Navbar />
          <div className="px-4 sm:px-4 md:px-6 py-2">
            <Outlet />
          </div>
          <div className="w-full">
            <Footer className="w-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
