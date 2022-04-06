import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { loggedIn } = useSelector(store => store.auth);
  
  if(!loggedIn) {
    return <Navigate to="/login" state={{from: location}} />
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired
}