import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Pay from './pages/pay';
import Logout from './pages/logout';
import TokenLogin from './pages/token';
import { SessionProvider } from './store/Session';
import ProtectedRoute from './components/ProtectedRoute';
import NoProtectedRoute from './components/NoProtectedRoute';

const router = createBrowserRouter([{
  path: "/",
  element: <NoProtectedRoute />,
  children: [
    {
      index: true,
      element: <TokenLogin />
    }
  ],
},
{
  element: <ProtectedRoute />,
  children: [
    {
      path: "/home",
      element: <Home />
    },
    {
      path: "/pay",
      element: <Pay />,
    },
  ]
},

{
  path: "/logout",
  element: <Logout />
},
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <SessionProvider>
    <RouterProvider router={router} />
  </SessionProvider>
);
