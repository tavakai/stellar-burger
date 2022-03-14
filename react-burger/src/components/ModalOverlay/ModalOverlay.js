import style from './ModalOverlay.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../services/actions';

const ModalOverlay = ({children}) => {
  const dispatch = useDispatch();
  const { modal } = useSelector(store => store.ingredients);

  return (
    <section
      className={`${style.overlay} ${modal ? style.overlay_show : ''}`}
      onClick={() => dispatch(hideModal())}
      >
      {children}
    </section>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.element
}

export default ModalOverlay;