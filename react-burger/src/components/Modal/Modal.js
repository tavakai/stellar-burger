import style from './Modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { HIDE_MODAL } from '../../services/actions';

const modalRoot = document.getElementById("modals");

const Modal = ({header, children, title}) => {
  const dispatch = useDispatch();
  const { modal } = useSelector(store => store.ingredients);
  const closeModal = () => {
    dispatch({
      type: HIDE_MODAL
    })
  }
  const handleEsc = (e) => {
    e.code === 'Escape' && dispatch({
      type: HIDE_MODAL
    })
  }
  useEffect(() => {
    if(modal) {
      document.addEventListener('keydown', handleEsc)
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [modal]);

  return (
    <>
    {
      modal &&
      ReactDOM.createPortal(
        <>
        <ModalOverlay>
          <div className={style.wrapper} onClick={(e) => e.stopPropagation()}>
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
  header: PropTypes.bool,
  children: PropTypes.element.isRequired,
  title: PropTypes.string
}

export default Modal;