import styles from './Profile.module.css';
import { FC, useEffect } from 'react';
import Nav from '../../components/Nav/Nav';
import { Routes, Route, useLocation } from 'react-router-dom';
import { FeedList } from '../../components/FeedList/FeedList';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import OrderDetailsPage from '../../components/OrderDetailsPage/OrderDetailsPage';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../services/actions/auth';
import { getCookie } from '../../utils/getCookie';
import Preloader from '../../components/Preloader/Preloader';

const Profile: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const section = location.pathname === '/profile/orders' ? styles.orders_section : styles.profile_section;
  const { authRequest, loggedIn } = useSelector((store: RootStateOrAny) => store.auth)


  useEffect(() => {
    !loggedIn && dispatch(getCurrentUser(getCookie('accessToken')));
  }, [loggedIn])

  return (
    <>
      {
        authRequest ? <Preloader /> : (
          <section className={section}>
            <Nav />
            <Routes>
              <Route path='/' element={
                <ProfileForm />
              } />
              <Route path='/orders' element={
                <FeedList space="orders" />
              } />
              {/* <Route path='/orders/:id' element={
                <OrderDetailsPage />
              } /> */}
            </Routes>
          </section>
        )
      }
    </>
  )
}

export default Profile;