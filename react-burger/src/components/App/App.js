import { useDispatch, useSelector } from 'react-redux';
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
import IngredientPage from '../../pages/IngredientPage/IngredientPage';
import ForgotPassword from '../../pages/Forgot-password/Forgot-password';
import ResetPassword from '../../pages/Reset-password/Reset-password';
import Profile from '../../pages/Profile/Profile';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { useEffect } from 'react';
import { getCookie } from '../../utils/getCookie';
import { getCurrentUser } from '../../services/actions/auth';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modal, currentIngredient } = useSelector(store => store.ingredients);
  const { orderRequest } = useSelector(store => store.order);
  const { loggedIn } = useSelector(store => store.auth);
  const location = useLocation();
  const background = location.state && location.state.background;

  const handleHideModal = () => {
    dispatch(hideModal())
    navigate(-1);
  }

  useEffect(() => {
    if (getCookie('refreshToken')) {
      dispatch(getCurrentUser(getCookie('refreshToken')));
    }
  }, [])

  return (
    <div className={style.App}>
      <AppHeader />
      <main className={style.main}>
        <Routes location={background || location}>
          <Route path='/' element={<Layout />} />
          <Route path='/login' element={
            loggedIn ? (
              <Navigate to="/" />
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
          <Route path='/ingredients/:id' element={<IngredientPage />} />
          <Route path='/profile/*' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
        {
          background && modal && currentIngredient &&
          <Routes>
            <Route path='/ingredients/:id' element={
              <Modal show={modal} hideModal={handleHideModal} header >
                <IngredientDetails />
              </Modal>
            } />
          </Routes>
        }
        {
          orderRequest ? (
            <Preloader />
          ) : (
            modal && !currentIngredient &&
            <Modal show={modal} hideModal={handleHideModal} header >
              <OrderDetails />
            </Modal>
          )
        }
      </main>
    </div>
  );
}

export default App;
