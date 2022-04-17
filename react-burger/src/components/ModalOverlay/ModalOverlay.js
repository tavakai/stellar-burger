import style from './ModalOverlay.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const ModalOverlay = ({children, closeModal}) => {
  const { modal } = useSelector(store => store.ingredients);

  return (
    <section
      className={`${style.overlay} ${modal ? style.overlay_show : ''}`}
      onClick={closeModal}
      >
      {children}
    </section>
  )
} 

ModalOverlay.propTypes = {
  children: PropTypes.element,
  closeModal: PropTypes.func
}

export default ModalOverlay;