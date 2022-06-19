import style from './BurgerIngredientsCard.module.css';
import { FC } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { showModal } from '../../../services/actions/actionCreators/modals';
import { currentIngredient } from '../../../services/actions/actionCreators/ingredients';
import { useDrag } from "react-dnd";
import { useLocation, useNavigate } from 'react-router-dom';
import { IIngredientCard, IIngredient } from '../../../utils/types';
import { useAppDispatch, useAppSelector } from '../../../services/types/reduxHooks';

const BurgerIngredientsCard: FC<IIngredientCard> = ({ ingredient, id }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { ingredientsInConstructor, bunsCount, buns } = useAppSelector(store => store.burgerConstructor);
  const [{ isDrag }, dragRef] = useDrag({
    type: ingredient.type,
    item: { id },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  })

  function getIngredientCount() {
    let counter = 0;
    ingredientsInConstructor.forEach((item: IIngredient) => {
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
    navigate(`/ingredients/${id}`, {
      state: { background: location },
    });
    dispatch(showModal())
  }

  return (
      <div ref={dragRef} className={style.wrapper} onClick={() => handleClickOnCard()} data-cy={id} >
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
  )
}

export default BurgerIngredientsCard;