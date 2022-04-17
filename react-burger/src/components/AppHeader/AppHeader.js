import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'
import { Link } from 'react-router-dom'

const AppHeader = () => {
  return (
    <header className={styles.header__container}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.nav__items_first}>
            <a href="#" className={styles.nav__link}>
              <BurgerIcon type="primary" />
              <p className={styles.nav__text}>
              Конструктор
              </p>
            </a>
          </li>
          <li className={styles.nav__items}>
          <a href="#" className={styles.nav__link}>
              <ListIcon type="secondary" />
              <p className={styles.nav__text_secondary}>
              Лента заказов
              </p>
            </a>
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