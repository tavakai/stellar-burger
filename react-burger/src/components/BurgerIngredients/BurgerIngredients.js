import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import style from "./BurgerIngredients.module.css";
import Margin from "../Margin/Margin";
import BurgerIngredientsTypeList from "./BurgerIngredientsTypesList/BurgerIngredientsTypesList";
import PropTypes from 'prop-types';

const BurgerIngredients = ({data, showModal, hideModal}) => {
  const [current, setCurrent] = useState("Булки");
  const _BUN_ = data.filter((el) => el.type === "bun");
  const _MAIN_ = data.filter((el) => el.type === "main");
  const _SAUCE_ = data.filter((el) => el.type === "sauce");

  const arrayTypesList = [
    {
      "title": "Булки",
      "data": _BUN_
    },
    {
      "title": "Соусы",
      "data": _SAUCE_
    },{
      "title": "Начинки",
      "data": _MAIN_
    }
  ];
  
  return (
    <section className={style.section}>
      <Margin margin="mt-10" />
      <h1 className={style.title}>Соберите бургер</h1>
      <Margin margin="mt-5" />
      <div className={style.tabsContainer}>
        <Tab value="Булки" active={current === "Булки"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === "Соусы"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
      <Margin margin="m-5" />
      <div className={style.list_wrapper} >
      {
      arrayTypesList.map((list, index) => {
        return <BurgerIngredientsTypeList
          key={index}
          data={list.data}
          title={list.title}
          showModal={showModal}
          hideModal={hideModal}
          />
      })
      }
    </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.array,
  showModal: PropTypes.func,
  hideModal: PropTypes.func
}

export default BurgerIngredients;
