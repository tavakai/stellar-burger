import { FC } from "react";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, FormEvent } from "react";
import { useForm } from "../../hooks/useForm";
import { updateCurrentUser, getCurrentUser } from "../../services/actions/auth";
import { getCookie } from "../../utils/getCookie";
import styles from '../../pages/Profile/Profile.module.css';
import stylesForm from '../../pages/form.module.css';
import { RootStateOrAny } from "react-redux";
import Preloader from "../Preloader/Preloader";

const ProfileForm: FC = () => {
  const dispatch = useDispatch();
  const { currentUser, updateUserRequest } = useSelector((store: RootStateOrAny) => store.auth);
  const [isEdit, setIsEdit] = useState(false);
  const { values, handleChange, setValues } = useForm({
    name: '',
    email: '',
    password: ''
  });
  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateCurrentUser(getCookie('accessToken'), {
      name: values.name,
      email: values.email
    }));
  }
  // useEffect(() => {
  //   dispatch(getCurrentUser(getCookie('accessToken')))
  // }, [])

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
      {updateUserRequest && <Preloader />}
    </div>
  )
}

export default ProfileForm;