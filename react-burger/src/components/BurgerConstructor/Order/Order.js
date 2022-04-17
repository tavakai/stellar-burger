import {
  Button, CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from '../BurgerConstructor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { showModal } from "../../../services/actions/actionCreators/modals";
import { createOrder } from "../../../services/actions/ingredients";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bunPrice, setBunPrice] = useState(0);
  const { ingredientsInConstructor, buns, bunsCount } = useSelector(store => store.burgerConstructor);
  const { loggedIn } = useSelector(store => store.auth);

  const handleClickOnOrderButton = () => {
    if (!loggedIn) {
      navigate("/login")
    } else {
      const mainIngredientsArray = ingredientsInConstructor.map(item => {
        return item._id
      })
      const orderArray = [...mainIngredientsArray, buns._id, buns._id];
      dispatch(createOrder(orderArray))
      dispatch(showModal())
    }
  }

  const ingredientsPrice = ingredientsInConstructor.reduce((sum, elem) => {
    return elem.price + sum;
  }, 0);

  useEffect(() => {
    if (buns !== null) {
      return setBunPrice(buns.price * bunsCount);
    } else {
      setBunPrice(0);
    }
  }, [buns])

  return (
    <div className={style.totalPrice_wrapper}>
      <p className={style.totalPrice_value}>{ingredientsPrice + bunPrice}</p>
      <div className={style.totalPrice_icon}>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large" onClick={handleClickOnOrderButton}>
        Оформить заказ
      </Button>
    </div>
  )
}

export default Order;