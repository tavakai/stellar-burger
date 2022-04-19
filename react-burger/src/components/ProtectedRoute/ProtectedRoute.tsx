import { useSelector, RootStateOrAny } from 'react-redux';
import { Navigate, RouteProps, useLocation } from 'react-router-dom';
import { FC } from 'react';

export const ProtectedRoute: FC<RouteProps | any> = ({ children }) => {
  const location = useLocation();
  const { loggedIn } = useSelector((store: RootStateOrAny) => store.auth);
  
  if(!loggedIn) {
    return <Navigate to="/login" state={{from: location}} />
  }
  return children;
}