import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../form.module.css';
import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { signIn } from '../../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../../components/Preloader/Preloader';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loggedIn, authRequest } = useSelector(store => store.auth);
  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });
  const fromPage = location.state?.from?.pathname || '/';
  const handleChangeInput = (e) => {
    handleChange(e);
  };
  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(values));
  }
  useEffect(() => {
    if(loggedIn) {
      navigate(fromPage);
    }
  }, [loggedIn])

  return (
    <section className={styles.section}>
      <div className={styles.form_wrapper}>
        <form action="#" className={styles.form} onSubmit={formSubmit}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.form_title}>Вход</legend>
            <Input
              type={'email'}
              placeholder={'E-mail'}
              value={values.email}
              onChange={handleChangeInput}
              name='email'
            />
            <Input
              type={'password'}
              placeholder={'Пароль'}
              value={values.password}
              onChange={handleChangeInput}
              icon={"ShowIcon"}
              name='password'
              autocomplete={"off"}
            />
          </fieldset>
          <Button type="primary" size="medium" >
            Войти
          </Button>
        </form>
        <span className={styles.form_text}>Вы - новый пользователь? <Link to="/register" className={styles.form_link}>Зарегистрироваться</Link></span>
        <span className={styles.form_text}>Забыли пароль? <Link to="/forgot-password" className={styles.form_link}>Восстановить пароль</Link></span>
      </div>
      { authRequest && <Preloader /> }
    </section>
  )
}

export default Login;