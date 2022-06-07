import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../form.module.css';
import { useForm } from '../../hooks/useForm';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { FC, FormEvent } from 'react';

const ForgotPassword: FC = () => {
  const navigate = useNavigate();
  const { values, handleChange } = useForm({
    email: ''
  });
  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    api.forgotPassword(values.email)
      .then(res => {
        if(res && res.success) {
          navigate('/reset-password');
        }
      })
      .catch(err => console.log(err));
  }
  return (
    <section className={styles.section}>
      <div className={styles.form_wrapper}>
        <form action="#" className={styles.form} onSubmit={submitForm}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.form_title}>Восстановление пароля</legend>
            <Input
              type={'email'}
              placeholder={'Укажите e-mail'}
              value={values.email}
              onChange={handleChange}
            />
          </fieldset>
          <Button type="primary" size="medium">
            Восстановить
          </Button>
        </form>
        <span className={styles.form_text}>Вспомнили пароль? <Link to="/login" className={styles.form_link}>Войти</Link></span>
      </div>
    </section>
  )
}

export default ForgotPassword;