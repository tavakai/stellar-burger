import style from './OrderDetailsPage.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useMemo, useState } from 'react';
import { IIngredient } from '../../utils/types';
import { useParams } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import { getOrder } from '../../services/actions/order';
import OrderDetailsItem from './OrderDetailsItem';
import sayDate from '../../utils/dayJs';
import { useAppDispatch, useAppSelector } from '../../services/types/reduxHooks';

const OrderDetailsPage: FC = () => {
  const { number } = useParams();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState('');
  const { orderByNumber } = useAppSelector(store => store.order);
  const { ingredients } = useAppSelector(store => store.ingredients);
  const uniqueIngredientsFromOrder = useMemo(() => ingredients?.filter((item: IIngredient) => orderByNumber?.ingredients.includes(item._id)), [orderByNumber, ingredients])

  const ingredientsFromOrder = useMemo(() => orderByNumber?.ingredients.map((elem: string) => {
    // Существуют заказы в массиве id которых есть null
    if(elem !== null && elem !== undefined) {
      const orderItem = ingredients.filter((item: IIngredient) => elem && item._id === elem);
      return orderItem[0]
    }
  }), [orderByNumber, ingredients]);

  const ingredientsPrice = useMemo(() => ingredientsFromOrder?.reduce((sum, elem) => {
    if(elem) {
      return elem.price + sum;
    } else {
      return 0
    }
  }, 0), [ingredientsFromOrder])

  useEffect(() => {
    dispatch(getOrder(number));
    orderByNumber?.status === 'done' && setStatus('Выполнен');
    orderByNumber?.status === 'created' && setStatus('Создан');
    orderByNumber?.status === 'pending' && setStatus('Готовится');
  }, [])

  return (
    <>
      {
        !orderByNumber ? (
          <Preloader />
        ) : (
          <section className={style.section}>
            <div className={style.content}>
              <p className={style.number}>#{orderByNumber.number}</p>
              <h3 className={style.title}>{orderByNumber.name}</h3>
              <span className={`${style.status} ${status === 'Выполнен' && style.status_completed}`}>{status}</span>
              <p className={style.compound}>Состав:</p>
              <ul className={style.details}>
                {
                  uniqueIngredientsFromOrder?.map((item, index) => {
                    return <OrderDetailsItem key={index} order={orderByNumber} item={item} />
                  })
                }
              </ul>
              <div className={style.order_info}>
                <p className={style.date}>{sayDate(orderByNumber.createdAt)}</p>
                <div className={style.sum_wrapper}>
                  <span className={style.sum}>{ingredientsPrice}</span>
                  <CurrencyIcon type='primary' />
                </div>
              </div>
            </div>
          </section>
        )
      }
    </>
  )
}

export default OrderDetailsPage;