import {
  Button, CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from '../BurgerConstructor.module.css';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useEffect, useState, FC } from "react";
import { showModal } from "../../../services/actions/actionCreators/modals";
import { createOrder } from "../../../services/actions/ingredients";
import { useNavigate } from "react-router-dom";
import { IIngredient } from "../../../utils/types";

const Order: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bunPrice, setBunPrice] = useState(0);
  const { ingredientsInConstructor, buns, bunsCount } = useSelector((store: RootStateOrAny) => store.burgerConstructor);
  const { loggedIn } = useSelector((store: RootStateOrAny) => store.auth);

  const handleClickOnOrderButton = () => {
    if (!loggedIn) {
      navigate("/login")
    } else {
      const mainIngredientsArray = ingredientsInConstructor.map((item: IIngredient) => {
        return item._id
      })
      const orderArray = [...mainIngredientsArray, buns._id, buns._id];
      dispatch(createOrder(orderArray))
      dispatch(showModal())
    }
  }

  const ingredientsPrice = ingredientsInConstructor.reduce((sum: number, elem: IIngredient) => {
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