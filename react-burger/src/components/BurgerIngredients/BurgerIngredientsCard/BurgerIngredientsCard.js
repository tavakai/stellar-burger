import style from './BurgerIngredientsCard.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { showModal } from '../../../services/actions/actionCreators/modals';
import { currentIngredient } from '../../../services/actions/actionCreators/ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import { useLocation, Link } from 'react-router-dom';

const BurgerIngredientsCard = ({ ingredient, id }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { ingredientsInConstructor, bunsCount, buns } = useSelector(store => store.burgerConstructor);
  const [{ isDrag }, dragRef] = useDrag({
    type: ingredient.type,
    item: { id },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  })

  function getIngredientCount() {
    let counter = 0;
    ingredientsInConstructor.forEach(item => {
      if (id === item._id) {
        counter += 1;
      }
    });

    if (buns !== null && ingredient._id === buns._id) {
      return bunsCount;
    } else {
      return counter;
    }
  }

  function handleClickOnCard() {
    dispatch(currentIngredient(ingredient))
    dispatch(showModal())
    // console.log(location, 'card')
  }

  return (
    <Link 
      to={`/ingredients/${id}`}
      state={{background: location}}
      key={id} 
      className={style.link}
      >
      <div ref={dragRef} className={style.wrapper} onClick={() => handleClickOnCard()} >
        {
          getIngredientCount() !== 0 ? (
            <Counter count={getIngredientCount()} size="default" />
          ) : null
        }
        <img className={style.img} src={ingredient.image} alt={ingredient.name} />
        <div className={style.price_wrapper} >
          <span className={style.price_value} >{ingredient.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={style.name} >
          {ingredient.name}
        </p>
      </div>
    </Link>
  )
}

BurgerIngredientsCard.propTypes = {
  ingredient: PropTypes.object.isRequired
}

export default BurgerIngredientsCard;