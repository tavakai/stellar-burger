import style from './OrderDetails.module.css';
import doneIcon from '../../images/icons/done.png';

const OrderDetails = () => {
  return (
    <div className={style.wrapper}>
      <h2 className={style.orderId}>034536</h2>
      <p className={style.subtitle}>идентификатор заказа</p>
      <img className={style.done_icon} src={doneIcon} alt="done" />
      <p className={style.status_title}>Ваш заказ начали готовить</p>
      <p className={style.status_unstructions}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails;