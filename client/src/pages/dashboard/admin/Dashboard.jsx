import React from 'react'
import { IoFastFood } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";

const Dashboard = () => {
    return (
        <div className="w-full h-screen  mt-4 px-4 mx-auto">
            <div className="dashboard-container rounded-2xl  max-w-screen-lg mx-auto">
                <h2 className="text-3xl text-white text-center  font-semibold mt-4 ">
                 Admin <span className='text-yellow-600'>Dashboard</span> 
                </h2>
                <div className="p-8">

                    {/* first raw */}
                    <div className="bg-black rounded-lg p-4 mb-8 flex justify-center">
                        <div className="stats bg-cardYellow text-slate-500 stats-vertical lg:stats-horizontal shadow-xl">

                            <div className="stat">
                                <div className="stat-figure text-slate-500 text-3xl">
                                    <FaUsers />
                                </div>
                                <div className="stat-title text-slate-500">Total Users</div>
                                <div className="stat-value text-slate-500">{100}</div>
                                <div className="stat-desc text-slate-500">6% more than last month</div>
                            </div>

                            <div class="stat ">
                                <div class="stat-figure text-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                </div>
                                <div class="stat-title text-slate-500">Page Views</div>
                                <div class="stat-value text-slate-500">30</div>
                                <div class="stat-desc text-slate-500">5% more than last month</div>
                            </div>

                            <div class="stat">
                                <div class="stat-figure text-secondary">
                                    <div class="avatar online">
                                        <div class="w-16 rounded-full">
                                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                        </div>
                                    </div>
                                </div>
                                <div class="stat-value text-slate-500">86%</div>
                                <div class="stat-title text-slate-500">Customer reviews</div>
                                <div class="stat-desc text-secondary text-slate-500">31 reviews remaining</div>
                            </div>
                        </div>
                    </div>

                    {/* 2 nd raw */}
                    <div className="bg-black rounded-lg p-4  mb-2 flex justify-center">
                        <div className="stats bg-cardYellow stats-vertical lg:stats-horizontal shadow-xl">

                            <div className="stat">
                                <div className="stat-figure   text-slate-500 text-3xl">
                                    <IoFastFood />
                                </div>
                                <div className="stat-title text-slate-500">Total Menu Items</div>
                                <div className="stat-value text-slate-500">{10}</div>
                                <div className="stat-desc text-slate-500">21% more than last month</div>
                            </div>

                            <div class="stat">
                                <div class="stat-figure text-slate-500 text-3xl">
                                    <FaCartShopping />
                                </div>
                                <div class="stat-title text-slate-500">Total Orders</div>
                                <div class="stat-value text-slate-500">{10 || 0}</div>
                                <div class="stat-desc text-slate-500">21% more than last month</div>
                            </div>

                            <div class="stat">
                                <div class="stat-figure text-secondary">
                                    <div class="avatar online">

                                    </div>
                                </div>
                                <div class="stat-figure text-slate-500 text-5xl ">
                                    <GiTakeMyMoney />
                                </div>
                                <div class="stat-title text-slate-500">Total Revenue </div>
                                <div class="stat-value text-slate-500">{20 || 0}</div>
                                <div class="stat-desc text-slate-500">6% more than last month</div>
                            </div>
                        </div>
                    </div>

                    {/* import chart1.png and chart2.png */}
                </div>
            </div>
        </div>
    )
}

export default Dashboard