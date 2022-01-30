import style from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({show, closeModal, children}) => {

  return (
    <section
      className={`${style.overlay} ${show ? style.overlay_show : ''}`}
      onClick={() => closeModal()}
      >
      {children}
    </section>
  )
}

ModalOverlay.propTypes = {
  show: PropTypes.string,
  closeModal: PropTypes.func,
  children: PropTypes.element
}

export default ModalOverlay;