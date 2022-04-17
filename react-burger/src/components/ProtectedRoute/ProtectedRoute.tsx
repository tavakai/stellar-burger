import { useSelector, RootStateOrAny } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { FC } from 'react';
import { IProtectedRoute } from '../../utils/types';

export const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const location = useLocation();
  const { loggedIn } = useSelector((store: RootStateOrAny) => store.auth);
  
  if(!loggedIn) {
    return <Navigate to="/login" state={{from: location}} />
  }

  return children;
}