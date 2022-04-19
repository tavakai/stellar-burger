import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import AppHeader from '../AppHeader/AppHeader';
import style from './App.module.css';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { hideModal } from '../../services/actions/actionCreators/modals';
import Preloader from '../Preloader/Preloader';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import Layout from '../Layout/Layout';
import ForgotPassword from '../../pages/Forgot-password/Forgot-password';
import ResetPassword from '../../pages/Reset-password/Reset-password';
import Profile from '../../pages/Profile/Profile';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { useEffect, FC } from 'react';
import { getCookie } from '../../utils/getCookie';
import { getCurrentUser } from '../../services/actions/auth';
import { getIngredients } from '../../services/actions/ingredients';
import { PageNotFound } from '../../pages/404/PageNotFound';

const App: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderNumber, orderSuccess } = useSelector((store: RootStateOrAny) => store.order);
  const { orderRequest } = useSelector((store: RootStateOrAny) => store.order);
  const { loggedIn } = useSelector((store: RootStateOrAny) => store.auth);
  const location = useLocation();
  const fromPage = location.state as { from?: Location }
  const state = location.state as { background?: Location };

  const handleHideModal = () => {
    dispatch(hideModal())
    !orderNumber && !orderSuccess && navigate(-1);
  }

  useEffect(() => {
    dispatch(getIngredients());
    if (getCookie('accessToken')) {
      dispatch(getCurrentUser(getCookie('accessToken')));
    }
  }, []); 
  
  return (
    <div className={style.App}>
      <AppHeader />
      <main className={style.main}>
        <Routes location={state?.background || location}>
          <Route path='/login' element={
            loggedIn ? (
              <Navigate to={fromPage?.from?.pathname || '/'} />
            ) : (<Login />)
          } />
          <Route path='/register' element={
            loggedIn ? (
              <Navigate to="/" />
            ) : (<Register />)
          } />
          <Route path='/forgot-password' element={
            loggedIn ? (
              <Navigate to="/" />
            ) : (<ForgotPassword />)
          } />
          <Route path='/reset-password' element={
            loggedIn ? (
              <Navigate to="/" />
            ) : (<ResetPassword />)
          } />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route path='/profile/*' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path='/' element={<Layout />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {
          state?.background &&
          <Routes>
            <Route path='/ingredients/:id' element={
              <Modal hideModal={handleHideModal} title={"Детали ингредиента"} >
                <IngredientDetails />
              </Modal>
            } />
          </Routes>
        }
        {
          orderRequest ? (
            <Preloader />
          ) : (
            orderNumber && orderSuccess &&
            <Modal hideModal={handleHideModal} header >
              <OrderDetails />
            </Modal>
          )
        }
      </main>
    </div>
  );
}

export default App;
