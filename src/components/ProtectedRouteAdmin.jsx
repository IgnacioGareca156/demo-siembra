import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../services/global.context';

const ProtectedRouteProfesor = ({ children }) => {
  const { state } = useContext(GlobalContext);

  if (state.admin) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

const ProtectedRouteAdmin = ({ children }) => {
  const { state } = useContext(GlobalContext)

  if (state.admin && state.admin.profesor_admin === true) {
    return children
  } else {
    return <Navigate to={"/panel"} />
  }
}

const AuthProtectedRoute = ({ children }) => {
  const { state } = useContext(GlobalContext);

  if (state.admin) {
    return <Navigate to="/panel" />;
  } else {
    return children;
  }
};

export { ProtectedRouteProfesor, AuthProtectedRoute, ProtectedRouteAdmin }
