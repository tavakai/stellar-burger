import style from './BurgerIngredientsCard.module.css';
import { CurrencyIcon, Counter  } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const BurgerIngredientsCard = ({item, showModal}) => {
  return (
    <div className={style.wrapper} onClick={() => showModal(item)} >
      <Counter count={1} size="default" />
      <img className={style.img}  src={item.image} alt={item.name} />
      <div className={style.price_wrapper} >
        <span className={style.price_value} >{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={style.name} >
        {item.name}
      </p>
    </div>
  )
}

BurgerIngredientsCard.propTypes = {
  item: PropTypes.object.isRequired,
  showModal: PropTypes.func
}

export default BurgerIngredientsCard;