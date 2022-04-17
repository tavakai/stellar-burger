import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../form.module.css';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { signUp } from '../../services/actions/register'; 
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../../components/Preloader/Preloader';

const Register = () => {
  const dispatch = useDispatch();
  const { authRequest } = useSelector(store => store.auth);
  const { values, handleChange } = useForm({
    name: '',
    email: '',
    password: ''
  });
  const handleChangeInput = (e) => {
    handleChange(e);
  };
  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(values));
  }
  return (
    <section className={styles.section}>
      <div className={styles.form_wrapper}>
        <form action="#" className={styles.form} onSubmit={formSubmit} >
          <fieldset className={styles.fieldset}>
            <legend className={styles.form_title}>Регистрация</legend>
            <Input
              type={'text'}
              placeholder={'Имя'}
              value={values.name}
              onChange={handleChangeInput}
              name={'name'}
            />
            <Input
              type={'email'}
              placeholder={'E-mail'}
              value={values.email}
              onChange={handleChangeInput}
              name={'email'}
            />
            <Input
              type={'password'}
              placeholder={'Пароль'}
              value={values.password}
              onChange={handleChangeInput}
              icon={"ShowIcon"}
              name={'password'}
              autocomplete={"off"}
            />
          </fieldset>
          <Button type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </form>
        <span className={styles.form_text}>Уже зарегистрированы? <Link to="/login" className={styles.form_link}>Войти</Link></span>
      </div>
      { authRequest && <Preloader /> }
    </section>
  )
}

export default Register;