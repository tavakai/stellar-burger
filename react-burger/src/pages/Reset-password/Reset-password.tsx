import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../form.module.css';
import { useForm } from '../../hooks/useForm';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { FC, FormEvent } from 'react';

const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const { values, handleChange } = useForm({
    password: '',
    token: ''
  });
  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    api.resetPassword(values.password, values.token)
      .then(res => {
        if(res && res.success) {
          navigate('/login')
        }
      })
  }
  return (
    <section className={styles.section}>
      <div className={styles.form_wrapper}>
        <form action="#" className={styles.form} onSubmit={formSubmit}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.form_title}>Восстановление пароля</legend>
            <Input
              type={'password'}
              placeholder={'Введите новый пароль'}
              value={values.password}
              onChange={handleChange}
              icon={'ShowIcon'}
              name={'password'}
            />
            <Input
              type={'password'}
              placeholder={'Введите код из письма'}
              value={values.token}
              onChange={handleChange}
              name={'token'}
            />
          </fieldset>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </form>
        <span className={styles.form_text}>Вспомнили пароль? <Link to="/login" className={styles.form_link}>Войти</Link></span>
      </div>
    </section>
  )
}

export default ResetPassword;