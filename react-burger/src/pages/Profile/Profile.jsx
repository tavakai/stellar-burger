import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Profile.module.css';
import stylesForm from '../form.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../../components/Preloader/Preloader';
import { useEffect, useState } from 'react';
import { getCookie } from '../../utils/getCookie';
import { getCurrentUser, logOut, updateCurrentUser } from '../../services/actions/auth';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authRequest, currentUser, updateUserRequest, updateUserSuccess } = useSelector(store => store.auth);
  const [isEdit, setIsEdit] = useState(false);
  const { values, handleChange, setValues } = useForm({
    name: '',
    email: '',
    password: ''
  });
  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCurrentUser(getCookie('accessToken'), {
      name: values.name,
      email: values.email
    }));
  }
  const handleSignOut = () => {
    dispatch(logOut());
    navigate('/login');
  }
  useEffect(() => {
    dispatch(getCurrentUser(getCookie('accessToken')))
  }, [])
  useEffect(() => {
    !updateUserRequest && setIsEdit(false);
  }, [updateUserRequest])

  useEffect(() => {
    setValues({
      ...values,
      name: currentUser.name,
      email: currentUser.email
    })
  }, [currentUser])

  return (
    <section className={styles.section}>
      <div>
        <nav className={styles.nav}>
          <NavLink to="/profile" className={styles.items}>
            Профиль
          </NavLink>
          <NavLink to="/profile/orders" className={styles.items}>
            История заказов
          </NavLink>
          <button to="/login" className={styles.signOut_btn} onClick={handleSignOut}>
            Выход
          </button>
        </nav>
        <p className={styles.description}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <div className={styles.form_wrapper}>
        <form action="#" className={styles.form} onSubmit={formSubmit} >
          <fieldset className={stylesForm.fieldset}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              value={values.name}
              onChange={handleChange}
              name={'name'}
              icon={'EditIcon'}
              required
              disabled={!isEdit}
              onIconClick={() => setIsEdit(true)}
            />
            <Input
              type={'email'}
              placeholder={'Логин'}
              value={values.email}
              onChange={handleChange}
              name={'email'}
              icon={'EditIcon'}
              disabled={!isEdit}
              onIconClick={() => setIsEdit(true)}
            />
            <Input
              type={'password'}
              placeholder={'Пароль'}
              value={values.password}
              onChange={handleChange}
              icon={"LockIcon"}
              name={'password'}
              autocomplete={"off"}
              readonly
              disabled
            />
          </fieldset>
          {
            isEdit && (
              <div className={styles.cta}>
                <button className={styles.editButtonCancel} onClick={() => setIsEdit(false)}>
                  отмена
                </button>
                <Button type="primary" size="small" disabled={updateUserRequest} >
                  Сохранить
                </Button>
              </div>
            )
          }
        </form>
      </div>
      {updateUserRequest && <Preloader />}
    </section>
  )
}

export default Profile;