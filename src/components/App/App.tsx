import AppHeader from '../AppHeader/AppHeader';
import style from './App.module.css';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetailsModal from '../OrderDetailsModal/OrderDetailsModal';
import { hideModal } from '../../services/actions/actionCreators/modals';
import Preloader from '../Preloader/Preloader';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import MainLayout from '../Layout/Layout';
import ForgotPassword from '../../pages/Forgot-password/Forgot-password';
import ResetPassword from '../../pages/Reset-password/Reset-password';
import Profile from '../../pages/Profile/Profile';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { useEffect, FC } from 'react';
import { getCookie } from '../../utils/getCookie';
import { getCurrentUser } from '../../services/actions/auth';
import { getIngredients } from '../../services/actions/ingredients';
import { PageNotFound } from '../../pages/404/PageNotFound';
import { Feed } from '../../pages/Feeds/Feed';
import OrderDetailsPage from '../OrderDetailsPage/OrderDetailsPage';
import { useAppDispatch, useAppSelector } from '../../services/types/reduxHooks';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { orderNumber, orderSuccess, orderRequest } = useAppSelector(store => store.order);
  const { loggedIn } = useAppSelector(store => store.auth);
  const { ingredients } = useAppSelector(store => store.ingredients);
  const location = useLocation();
  const fromPage = location.state as { from?: Location }
  const state = location.state as { background?: Location };

  const handleHideModal = () => {
    dispatch(hideModal())
    !orderNumber && !orderSuccess && navigate(-1);
  }

  useEffect(() => {
    if(ingredients.length === 0) {
      dispatch(getIngredients());
    }    
    dispatch(getCurrentUser(getCookie('accessToken')));
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
          <Route path='/profile/orders/:number' element={<OrderDetailsPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/feed/:number' element={<OrderDetailsPage />} />
          <Route path='/' element={<MainLayout />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {
          state?.background && (
            <Routes>
            <Route path='/ingredients/:id' element={
              <Modal hideModal={handleHideModal} title={"Детали ингредиента"} >
                <IngredientDetails />
              </Modal>
            } />
             <Route path='/feed/:number' element={
              <Modal hideModal={handleHideModal}>
                <OrderDetailsPage />
              </Modal>
            } />
            <Route path="/profile/orders/:number" element={
                <Modal hideModal={handleHideModal}>
                  <OrderDetailsPage />
              </Modal>
              } />
          </Routes>
          )
        }
        {
          orderRequest ? (
            <Preloader />
          ) : (
            orderNumber && orderSuccess &&
            <Modal hideModal={handleHideModal} header >
              <OrderDetailsModal />
            </Modal>
          )
        }
      </main>
    </div>
  );
}

export default App;
