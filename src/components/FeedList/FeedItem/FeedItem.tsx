import { FC, useEffect, useMemo, useState } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './FeedItem.module.css';
import { IIngredient, IOrderItemLocation } from "../../../utils/types";
import { useLocation, useNavigate } from "react-router-dom";
import { showModal } from "../../../services/actions/actionCreators/modals";
import { currentIngredient } from "../../../services/actions/actionCreators/ingredients";
import sayDate from "../../../utils/dayJs";
import { useAppDispatch, useAppSelector } from "../../../services/types/reduxHooks";

export const FeedItem: FC<IOrderItemLocation> = ({ space, feed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState('');
  const { ingredients } = useAppSelector(store => store.ingredients);
  const ingredientsFromOrder = useMemo(() => feed.ingredients.map((elem: string) => {
    // Существуют заказы в массиве id которых есть null
    if(elem !== null && elem !== undefined) {
      const orderItem = ingredients.filter(item => elem && item._id === elem);
      return orderItem[0]
    }
  }), [feed, ingredients]);

  const uniqueIngredientsFromOrder = useMemo(() => ingredients.filter((item: IIngredient) => feed.ingredients.includes(item._id)), [feed.ingredients, ingredients]);

  const ingredientsPrice = useMemo(() => ingredientsFromOrder.reduce((sum, elem) => {
    if(elem) {
      return elem.price + sum;
    } else {
      return 0
    }
  }, 0), [ingredientsFromOrder])

  const visibleIcons = uniqueIngredientsFromOrder.length < 5 ? uniqueIngredientsFromOrder : uniqueIngredientsFromOrder.slice(0, 5)
  const hiddenIcon = uniqueIngredientsFromOrder.length > 5 ? uniqueIngredientsFromOrder.length - 5 : 0;

  function handleClickOnCard() {
    navigate(`${location.pathname}/${feed.number}`, {
      state: { background: location },
    });
    dispatch(currentIngredient(feed))
    dispatch(showModal());
  }

  useEffect(() => {
    feed.status === 'done' && setStatus('Выполнен');
    feed.status === 'created' && setStatus('Создан');
    feed.status === 'pending' && setStatus('Готовится');
  }, [feed.status]);

  return (
    <div className={style.wrapper} onClick={() => handleClickOnCard()}>
      <div className={style.info}>
        <p className={style.number}>#{feed.number}</p>
        <span className={style.date}>{sayDate(feed.createdAt)}</span>
      </div>
      <h3 className={style.name}>{feed.name}</h3>
      {
        location.pathname === '/profile/orders' ? (<p className={`${style.status} ${status === 'Выполнен' && style.status_completed}`}>{status}</p>) : (null)
      }
      <div className={style.details}>
        <ul className={style.buns}>
          {
            visibleIcons.map((item, index) => {
              return <li className={style.bunsItem} key={item._id}>
                <img className={style.icon} src={item.image} alt={item.name} />
                {
                  hiddenIcon > 0 && index === 0 && (
                    <span className={style.hiddenIcons}>+{hiddenIcon}</span>
                  )
                }
              </li>
            })
          }

        </ul>
        <div className={style.price}>
          <span className={style.sum}>
            {ingredientsPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}