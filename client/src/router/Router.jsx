import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import { Login, Signup } from "../components";
import Home from "../pages/home/Home";
import Menu from "../pages/manuPage/Menu";
import About from "../pages/other/About";
import Contact from "../pages/other/Contact";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import ManageBooking from "../pages/dashboard/admin/ManageBooking";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import Users from "../pages/dashboard/admin/Users";
import UserProfile from "../pages/dashboard/UserProfile";
import Order from "../pages/dashboard/Order";
import CartPage from "../pages/manuPage/CartPage";
import CheckoutForm from "../pages/manuPage/CheckoutForm";
import Payment from "../pages/manuPage/Payment";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import { useViewSingleMenuQuery } from "../api/menuItemApiSlice";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/menu",
        element: <Menu />
      },
     
      {
        path: "/about-us",
        element: <About/>
      },
      {
        path: "/contact-us",
        element: <Contact/>
      },
      {
        path: "/update-profile",
        element: <UserProfile/>
      },
      {
        path: "/order",
        element:<PrivateRoute><Order/></PrivateRoute>
      },
      {
        path: "/cart-page",
        element: <CartPage/>
      },
      {
        path:"/process-checkout",
        element:<Payment/>
      },
    ]
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
    children: [
      {
        path: '',
        element: <Dashboard/>
      },
      {
        path: 'users', 
        element: <Users/>
      },
      {
        path: 'add-menu',
        element: <AddMenu/>
      }, 
      {
        path: "manage-items",
        element: <ManageItems/>
      },
      {
        path: "update-menu/:id",
        element: <UpdateMenu/>
      },
      {
        path: "manage-booking",
        element: <ManageBooking/>
      }
    ]
  }
]);

export default router;