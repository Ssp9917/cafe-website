import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import { Login, Signup } from "../components";
import Home from "../pages/home/Home";
import Menu from "../pages/manuPage/Menu";
import About from "../pages/other/About";
import Contact from "../pages/other/Contact";



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
      }
    ]
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  }
]);

export default router;