import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../services/global.context';

const ProtectedRouteProfesor = ({ children }) => {
  const { state } = useContext(GlobalContext);

  if (state.admin && state.admin.profesor_admin) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

const AuthProtectedRouteProfesor = ({ children }) => {
  const { state } = useContext(GlobalContext);

  if (state.alumno) {
    return <Navigate to="/digital" />;
  } else {
    return children;
  }
};

export {ProtectedRouteProfesor, AuthProtectedRouteProfesor}
