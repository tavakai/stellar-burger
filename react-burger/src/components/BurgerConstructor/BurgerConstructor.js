import {
  ConstructorElement, Button, CurrencyIcon, DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import Margin from "../Margin/Margin";
import style from "./BurgerConstructor.module.css";
import PropTypes from 'prop-types';

const BurgerConstructor = ({ data, showModal }) => {
  return (
    <section className={style.wrapper}>
      <Margin margin="mt-25" />
      <div className={style.list}>
          {data.map((el) => {
          return (
            <>
              <div className={style.list_item}>
                <DragIcon type="primary" />
                <ConstructorElement
                key={el._id}
                text={el.name}
                price={el.price}
                thumbnail={el.image}
                />
              </div>
            </>
          );
        })}
      </div>
      <Margin margin="mt-10" />
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
