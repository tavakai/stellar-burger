import { FC } from 'react';
import style from './Preloader.module.css';

const Preloader: FC = () => {
  return (
    <div className={style.preloader} >
    <div className={style.preloader__icon} />
    </div>
  )
}

export default Preloader;