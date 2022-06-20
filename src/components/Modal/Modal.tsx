import style from './Modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useEffect, FC } from "react";
import { IModal } from '../../utils/types';
import { useAppSelector } from '../../services/types/reduxHooks';

const modalRoot = document.getElementById("modals") as HTMLElement;

const Modal: FC<IModal> = ({ hideModal, header, children, title }) => {
  const { modal } = useAppSelector(store => store.ingredients);

  const handleEsc = (e: KeyboardEvent) => {
    e.code === 'Escape' && hideModal();
  }
  useEffect(() => {
    if (modal) {
      document.addEventListener('keydown', handleEsc)
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [modal]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay closeModal={hideModal}>
        <div className={style.wrapper} onClick={(e) => e.stopPropagation()} data-cy="modal">
          <div className={!header ? style.header : style.header_none}>
            {
              !header && <h3 className={style.title}>{title}</h3>
            }
            <CloseIcon type="primary" onClick={hideModal} />
          </div>
          {children}
        </div>
      </ModalOverlay>
    </>,
    modalRoot
  )
}

export default Modal;