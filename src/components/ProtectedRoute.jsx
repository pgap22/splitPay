import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from '../hook/useSession';

const ProtectedRoute = () => {
    const { splitPay } = useSession();

    console.log(splitPay)
    //   // Si no hay splitPay autenticado, redirige al home
      if (!splitPay || Object.keys(splitPay).length === 0) {
        return <Navigate to="/" replace />;
      }

    // Si hay splitPay autenticado, renderiza las rutas hijas
    return <Outlet />;
};

export default ProtectedRoute;