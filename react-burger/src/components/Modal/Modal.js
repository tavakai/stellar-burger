import style from './Modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useEffect } from "react";
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("modals");

const Modal = ({show, hideModal, header, children, title}) => {
  const closeModal = () => {
    hideModal(false);
  }
  const handleEsc = (e) => {
    e.code === 'Escape' && closeModal();
  }
  useEffect(() => {
    if(show) {
      document.addEventListener('keydown', handleEsc)
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [show]);

  return (
    <>
    {
      show &&
      ReactDOM.createPortal(
        <>
        <ModalOverlay show={show} closeModal={closeModal}>
          <div className={style.wrapper}>
          <div className={!header ? style.header : style.header_none}>
            {
            !header && <h3 className={style.title}>{title}</h3>
            }
            <CloseIcon type="primary" onClick={closeModal} />
          </div>
          { children }
        </div>
        </ModalOverlay>
        </>,
        modalRoot
      )
    }
    </>
  )
}

Modal.propTypes = {
  show: PropTypes.bool,
  header: PropTypes.bool,
  hideModal: PropTypes.func,
  children: PropTypes.element,
  title: PropTypes.string
}

export default Modal;