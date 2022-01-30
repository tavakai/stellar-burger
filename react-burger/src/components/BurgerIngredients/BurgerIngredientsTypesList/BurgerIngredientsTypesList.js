import Margin from '../../Margin/Margin';
import BurgerIngredientsCard from '../BurgerIngredientsCard/BurgerIngredientsCard';
import style from './BurgerIngredientsTypeList.module.css';
import PropTypes from 'prop-types';

const BurgerIngredientsTypeList = ({data, title, showModal, hideModal}) => {
  
  return (
    <>
      <h1 className={style.title}>{title}</h1>
      <Margin margin="m-6" />
      <div className={style.list}>
        {
        data.map((el) => {
          return <BurgerIngredientsCard
            key={el._id}
            item={el}
            showModal={showModal}
            hideModal={hideModal}
            />
        })
      }
      </div>
      <Margin margin="m-10" />
    </>
  )
}

BurgerIngredientsTypeList.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  showModal: PropTypes.func,
  hideModal: PropTypes.func
}

export default BurgerIngredientsTypeList;