import { Navigate, RouteProps, useLocation } from 'react-router-dom';
import { FC } from 'react';
import { useAppSelector } from '../../services/types/reduxHooks';

export const ProtectedRoute: FC<RouteProps | any> = ({ children }) => {
  const location = useLocation();
  const { loggedIn } = useAppSelector(store => store.auth);

  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: location }} />
  }
  return children;
}