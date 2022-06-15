import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../form.module.css';
import { ChangeEvent, FC, FormEvent, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { signIn } from '../../services/actions/auth';
import Preloader from '../../components/Preloader/Preloader';
import { useAppDispatch, useAppSelector } from '../../services/types/reduxHooks';

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { loggedIn, authRequest } = useAppSelector(store => store.auth);
  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });
  const fromPage = location.state as { from?: any }
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(signIn(values));
  }
  useEffect(() => {
    if(loggedIn) {
      console.log(fromPage)
      navigate(fromPage?.from?.pathname);
    }
  }, [loggedIn])

  return (
    <section className={styles.section}>
      <div className={styles.form_wrapper}>
        <form action="#" className={styles.form} onSubmit={handleSubmit}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.form_title}>Вход</legend>
            <Input
              type={'email'}
              placeholder={'E-mail'}
              value={values.email}
              onChange={handleChangeInput}
              name='email'
            />
            <PasswordInput
              value={values.password}
              onChange={handleChangeInput}
              name='password'
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