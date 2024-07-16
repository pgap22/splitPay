import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Pay from './pages/pay';
import Logout from './pages/logout';

const router = createBrowserRouter([{
  path: "/",
  element: <Home/>,
},
{
  path: "/pay",
  element: <Pay/>,
},
{
  path: "/logout",
  element: <Logout/>
},
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
