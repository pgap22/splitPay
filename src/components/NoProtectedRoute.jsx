import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '../hook/useSession';

const NoProtectedRoute = () => {
    const { splitPay } = useSession();

    console.log(splitPay)
    //   // Si no hay splitPay autenticado, redirige al home
      if (splitPay || Object.keys(splitPay).length) {
        return <Navigate to="/home" replace />;
      }

    // Si hay splitPay autenticado, renderiza las rutas hijas
    return <Outlet />;
};

export default NoProtectedRoute;