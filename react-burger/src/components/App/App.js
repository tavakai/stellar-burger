import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../AppHeader/AppHeader';
import style from './App.module.css';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { hideModal } from '../../services/actions/actionCreators/modals';
import Preloader from '../Preloader/Preloader';
import { Routes, Route, useLocation, Navigate, useNavigate, useParams } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import Layout from '../Layout/Layout';
import ForgotPassword from '../../pages/Forgot-password/Forgot-password';
import ResetPassword from '../../pages/Reset-password/Reset-password';
import Profile from '../../pages/Profile/Profile';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { useEffect } from 'react';
import { getCookie } from '../../utils/getCookie';
import { getCurrentUser } from '../../services/actions/auth';
import { getIngredients } from '../../services/actions/ingredients';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderNumber, orderSuccess } = useSelector(store => store.order);
  const { orderRequest } = useSelector(store => store.order);
  const { loggedIn } = useSelector(store => store.auth);
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';
  const state = location.state && location.state.background;

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
        <Routes location={state || location}>
          <Route path='/' element={<Layout />} />
          <Route path='/login' element={
            loggedIn ? (
              <Navigate to={fromPage} />
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
        </Routes>
        {
          state &&
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
