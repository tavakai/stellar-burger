import style from './OrderDetails.module.css';
import Margin from '../Margin/Margin';
import doneIcon from '../../images/icons/done.png';

const OrderDetails = () => {
  return (
    <div className={style.wrapper}>
      <h1 className={style.orderId}>034536</h1>
      <Margin margin="m-4" />
      <p className={style.subtitle}>идентификатор заказа</p>
      <Margin margin="mt-15" />
      <img className={style.done_icon} src={doneIcon} alt="done" />
      <Margin margin="mt-15" />
      <p className={style.status_title}>Ваш заказ начали готовить</p>
      <Margin margin="mt-2" />
      <p className={style.status_unstructions}>Дождитесь готовности на орбитальной станции</p>
      <Margin margin="m-15" />
    </div>
  )
}

export default OrderDetails;