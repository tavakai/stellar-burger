import { FC } from "react";
import { Link } from "react-router-dom";
import style from './PageNotFound.module.css';

export const PageNotFound: FC = () => {
  return (
    <section className={style.section}>
      <h2>Упс... Мы не можем найти то, что Вы ищете</h2>
      <p>Проверьте адрес или вернитесь на <Link to='/' className={style.link}>главную</Link></p>
    </section>
  )
}