import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { IOrderComposition } from "../../utils/types";
import style from './OrderDetailsPage.module.css';

const OrderDetailsItem: FC<IOrderComposition> = ({ item, order }) => {
  const ingredientsCount = order?.ingredients.filter((elemId: string) => elemId === item._id).length;
  return (
    <li className={style.item}>
      <div className={style.icon_wrapper}>
        <img className={style.item_img} src={item.image} alt={item.name} />
      </div>
      <p className={style.name}>{item.name}</p>
      <div className={style.item_price_wrapper}>
        <span className={style.count}>{ingredientsCount} x {item.price}</span>
        <CurrencyIcon type='primary' />
      </div>
    </li>
  )
}

export default OrderDetailsItem;