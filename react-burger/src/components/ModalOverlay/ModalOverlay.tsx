import style from './ModalOverlay.module.css';
import { useSelector, RootStateOrAny } from 'react-redux';
import { FC } from 'react';
import { IModalOverlay } from '../../utils/types';

const ModalOverlay: FC<IModalOverlay> = ({children, closeModal}) => {
  const { modal } = useSelector((store: RootStateOrAny) => store.ingredients);

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