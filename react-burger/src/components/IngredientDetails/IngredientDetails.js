import style from './IngredientDetails.module.css';
import PropTypes from 'prop-types';

const IngredientDetails = ({data}) => {
  return (
    <div className={style.wrapper}>
      <img className={style.image} src={data.image_large} alt={data.name} />
      <h3 className={style.title}>{data.name}</h3>
      <ul className={style.list}>
        <li className={style.list_item}>
          <p className={style.item_name}>Калории, ккал</p>
          <p className={style.item_value}>{data.calories}</p>
        </li>
        <li className={style.list_item}>
          <p className={style.item_name}>Белки, г</p>
          <p className={style.item_value}>{data.proteins}</p>
        </li>
        <li className={style.list_item}>
          <p className={style.item_name}>Жиры, г</p>
          <p className={style.item_value}>{data.fat}</p>
        </li>
        <li className={style.list_item}>
          <p className={style.item_name}>Углеводы, г</p>
          <p className={style.item_value}>{data.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  data: PropTypes.object
}

export default IngredientDetails;