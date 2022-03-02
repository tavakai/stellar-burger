import style from './IngredientDetails.module.css';
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
  const { currentIngredient } = useSelector(store => store.ingredients);
  return (
    <div className={style.wrapper}>
      <img className={style.image} src={currentIngredient.image_large} alt={currentIngredient.name} />
      <h3 className={style.title}>{currentIngredient.name}</h3>
      <ul className={style.list}>
        <li className={style.list_item}>
          <p className={style.item_name}>Калории, ккал</p>
          <p className={style.item_value}>{currentIngredient.calories}</p>
        </li>
        <li className={style.list_item}>
          <p className={style.item_name}>Белки, г</p>
          <p className={style.item_value}>{currentIngredient.proteins}</p>
        </li>
        <li className={style.list_item}>
          <p className={style.item_name}>Жиры, г</p>
          <p className={style.item_value}>{currentIngredient.fat}</p>
        </li>
        <li className={style.list_item}>
          <p className={style.item_name}>Углеводы, г</p>
          <p className={style.item_value}>{currentIngredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

export default IngredientDetails;