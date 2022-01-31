import {
  ConstructorElement, Button, CurrencyIcon, DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./BurgerConstructor.module.css";
import bun_icon from '../../images/icons/bun-02.png';
import PropTypes from 'prop-types';

const BurgerConstructor = ({ data, showModal }) => {
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
          {data.map((el) => {
          return (
              <div className={style.list_item} key={el._id} >
                <DragIcon type="primary" />
                <ConstructorElement
                // key={el._id} ??
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
  data: PropTypes.array,
  showModal: PropTypes.func
}

export default BurgerConstructor;
