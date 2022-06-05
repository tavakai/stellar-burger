import { useSelector, RootStateOrAny } from 'react-redux';
import { Navigate, Route, RouteProps, Routes, useLocation } from 'react-router-dom';
import { FC } from 'react';

export const ProtectedRoute: FC<RouteProps | any> = ({ children, ...rest }) => {
  const location = useLocation();
  const { loggedIn } = useSelector((store: RootStateOrAny) => store.auth);

  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: location }} />
  }
  return children;

  // return (
  //   <Routes>
  //     <Route {...rest}
  //     render={(location: any) => (
  //       loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  //     )
  //     }
  //   />
  //   </Routes>
  // )
}