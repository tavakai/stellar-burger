import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const UnAuthRoute = ({ children, page }) => {
  const location = useLocation();
  const { loggedIn } = useSelector(store => store.auth);
  
  if(!loggedIn) {
    return <Navigate to="/login" state={{from: location}} />
  } else {
    <Navigate to={page} state={{from: location}} />
  }

  return children;
}