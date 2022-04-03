import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { loggedIn } = useSelector(store => store.auth);
  
  if(!loggedIn) {
    return <Navigate to="/login" state={{from: location}} />
  }

  return children;
}