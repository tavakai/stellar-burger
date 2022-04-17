import style from './Modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useEffect } from "react";
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const modalRoot = document.getElementById("modals");

const Modal = ({ hideModal, header, children, title }) => {
  const { modal } = useSelector(store => store.ingredients);

  const handleEsc = (e) => {
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
        <div className={style.wrapper} onClick={(e) => e.stopPropagation()}>
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

Modal.propTypes = {
  header: PropTypes.bool,
  hideModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  title: PropTypes.string
}

export default Modal;