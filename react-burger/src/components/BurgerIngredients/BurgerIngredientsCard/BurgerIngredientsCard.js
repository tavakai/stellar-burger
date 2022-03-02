import style from './BurgerIngredientsCard.module.css';
import { CurrencyIcon, Counter  } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { SHOW_MODAL, CURRENT_INGREDIENT } from '../../../services/actions/index';
import { useDispatch } from 'react-redux';

const BurgerIngredientsCard = ({item}) => {
  const dispatch = useDispatch();
  function handleClickOnCard() {
    dispatch({
      type: SHOW_MODAL
    })
    dispatch({
      type: CURRENT_INGREDIENT,
      currentIngredient: item
    })
  }
  return (
    <div className={style.wrapper} onClick={() => handleClickOnCard()} >
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
  item: PropTypes.object.isRequired
}

export default BurgerIngredientsCard;