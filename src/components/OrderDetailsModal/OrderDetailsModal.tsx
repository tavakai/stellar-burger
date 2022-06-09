import style from './OrderDetailsModal.module.css';
import doneIcon from '../../images/icons/done.png';
import { FC } from 'react';
import { useAppSelector } from '../../services/types/reduxHooks';

const OrderDetailsModal: FC = () => {
  const { orderNumber } = useAppSelector(store => store.order);
  return (
    <div className={style.wrapper}>
      <h2 className={style.orderId}>{orderNumber}</h2>
      <p className={style.subtitle}>идентификатор заказа</p>
      <img className={style.done_icon} src={doneIcon} alt="done" />
      <p className={style.status_title}>Ваш заказ начали готовить</p>
      <p className={style.status_unstructions}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetailsModal;