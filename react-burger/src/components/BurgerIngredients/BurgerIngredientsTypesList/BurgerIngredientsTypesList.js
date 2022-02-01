import BurgerIngredientsCard from '../BurgerIngredientsCard/BurgerIngredientsCard';
import style from './BurgerIngredientsTypeList.module.css';
import PropTypes from 'prop-types';

const BurgerIngredientsTypeList = ({data, title, showModal, hideModal}) => {
  
  return (
    <>
      <h2 className={style.title}>{title}</h2>
      <div className={style.list}>
        {
        data.map((el) => {
          return (
          <BurgerIngredientsCard
            key={el._id}
            item={el}
            showModal={showModal}
            hideModal={hideModal}
            />
            )
        })
      }
      </div>
    </>
  )
}

BurgerIngredientsTypeList.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  showModal: PropTypes.func,
  hideModal: PropTypes.func
}

export default BurgerIngredientsTypeList;