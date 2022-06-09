import style from './ModalOverlay.module.css';
import { FC } from 'react';
import { IModalOverlay } from '../../utils/types';
import { useAppSelector } from '../../services/types/reduxHooks';

const ModalOverlay: FC<IModalOverlay> = ({children, closeModal}) => {
  const { modal } = useAppSelector(store => store.ingredients);

  return (
    <section
      className={`${style.overlay} ${modal ? style.overlay_show : ''}`}
      onClick={closeModal}
      >
      {children}
    </section>
  )
} 

export default ModalOverlay;