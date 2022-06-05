import styles from './Nav.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FC } from 'react';
import { logOut } from '../../services/actions/auth';

const Nav: FC = () => {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(logOut());
  }

  return (
      <div>
        <nav className={styles.nav}>
          <NavLink end to="/profile" className={({isActive}) => !isActive ? styles.items : styles.active}>
            Профиль
          </NavLink>
          <NavLink to="/profile/orders" className={({isActive}) => !isActive ? styles.items : styles.active}>
            История заказов
          </NavLink>
          <NavLink to="/login" className={styles.signOut_btn} onClick={handleSignOut}>
            Выход
          </NavLink>
        </nav>
        <p className={styles.description}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
  )
}

export default Nav;