import {
  ConstructorElement, Button, CurrencyIcon, DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import style from "./BurgerConstructor.module.css";
import bun_icon from '../../images/icons/bun-02.png';
import PropTypes from 'prop-types';
import { SHOW_MODAL } from "../../services/actions";

const BurgerConstructor = ({ showModal }) => {
  const dispatch = useDispatch();
  const { ingredientsInConstructor, order } = useSelector(store => store.ingredients);
  function handleClickOnOrderButton() {
    dispatch({
      type: SHOW_MODAL
    })
  }
  return (
    <section className={style.wrapper}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={bun_icon}
      />
      <div className={style.list}>
          {ingredientsInConstructor.map((el) => {
          return (
              <div className={style.list_item} key={el._id} >
                <DragIcon type="primary" />
                <ConstructorElement
                text={el.name}
                price={el.price}
                thumbnail={el.image}
                />
              </div>
          );
        })}
      </div>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={bun_icon}
      />
      <div className={style.totalPrice_wrapper}>
        <p className={style.totalPrice_value}>610</p>
        <div className={style.totalPrice_icon}>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={() => showModal("order")}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  showModal: PropTypes.func
}

export default BurgerConstructor;
