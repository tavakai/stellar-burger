import { FC } from 'react'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'
import { Link } from 'react-router-dom'

const AppHeader: FC = () => {
  return (
    <header className={styles.header__container}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.nav__items_first}>
            <Link to="/" className={styles.nav__link}>
              <BurgerIcon type="primary" />
              <p className={styles.nav__text}>
              Конструктор
              </p>
            </Link>
          </li>
          <li className={styles.nav__items}>
          <Link to="feed" className={styles.nav__link}>
              <ListIcon type="secondary" />
              <p className={styles.nav__text_secondary}>
              Лента заказов
              </p>
            </Link>
          </li>
        </ul>
        <Link to="/">
          <Logo />
        </Link>
        <Link to="/profile" className={styles.nav__link_button}>
          <ProfileIcon type="primary" />
          <p className={styles.nav__text}>
          Личный кабинет
          </p>
        </Link>
      </nav>
    </header>
  )
}

export default AppHeader;