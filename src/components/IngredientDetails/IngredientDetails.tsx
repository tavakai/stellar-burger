import style from './IngredientDetails.module.css';
import { useEffect, useMemo, FC } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { currentIngredient } from '../../services/actions/actionCreators/ingredients';
import { showModal } from '../../services/actions/actionCreators/modals';
import { IIngredient } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../services/types/reduxHooks';

const IngredientDetails: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { id } = useParams();
  const { ingredients } = useAppSelector(store => store.ingredients);
  const state = location.state as { background?: Location }
  const ingredient = useMemo(
    () => ingredients.find((item: IIngredient) => item._id === id),
    [ingredients, id],
  );

  useEffect(() => {
    if (ingredient) {
      dispatch(currentIngredient(ingredient))
      dispatch(showModal());
    }
  }, [ingredient])

  return (
    <>
      {
        ingredient ? (
          <section className={style.section}>
            <div className={style.wrapper}>
            {!state?.background && <h1 className={style.title}>Детали ингредиента</h1>}
            <img className={style.image} src={ingredient.image_large} alt={ingredient.name} />
            <h3 className={style.name}>{ingredient.name}</h3>
            <ul className={style.list}>
              <li className={style.list_item}>
                <p className={style.item_name}>Калории, ккал</p>
                <p className={style.item_value}>{ingredient.calories}</p>
              </li>
              <li className={style.list_item}>
                <p className={style.item_name}>Белки, г</p>
                <p className={style.item_value}>{ingredient.proteins}</p>
              </li>
              <li className={style.list_item}>
                <p className={style.item_name}>Жиры, г</p>
                <p className={style.item_value}>{ingredient.fat}</p>
              </li>
              <li className={style.list_item}>
                <p className={style.item_name}>Углеводы, г</p>
                <p className={style.item_value}>{ingredient.carbohydrates}</p>
              </li>
            </ul>
          </div>
          </section>
          
        ) : (
          <h3 className={style.title}>Упс.. Такой ингредиент не найден</h3>
        )
      }
    </>
  )
}

export default IngredientDetails;