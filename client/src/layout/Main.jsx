import React, { useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Navbar } from '../components'
import LoadingSpinner from '../components/LoadingSpinner'
import { AuthContext } from '../context/AuthProvider'

const Main = () => {

    const {loading} = useContext(AuthContext)

    

    return (
        <div className="bg-white h-full">
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className='max-w-screen-2xl mx-auto'>
                    <Navbar />
                    <div className="min-h-screen">
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    )
}

export default Main