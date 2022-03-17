import style from './OrderDetails.module.css';
import doneIcon from '../../images/icons/done.png';
import { useSelector } from 'react-redux';

const OrderDetails = () => {
  const { orderNumber } = useSelector(store => store.order);
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

export default OrderDetails;