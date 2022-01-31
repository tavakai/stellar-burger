import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import style from "./BurgerIngredients.module.css";
import BurgerIngredientsTypeList from "./BurgerIngredientsTypesList/BurgerIngredientsTypesList";
import PropTypes from 'prop-types';

const BurgerIngredients = ({data, showModal, hideModal}) => {
  const [current, setCurrent] = useState("Булки");
  const _BUN_ = data.filter((el) => el.type === "bun");
  const _MAIN_ = data.filter((el) => el.type === "main");
  const _SAUCE_ = data.filter((el) => el.type === "sauce");

  const arrayTypesList = [
    {
      "id": 1,
      "title": "Булки",
      "data": _BUN_
    },
    {
      "id": 2,
      "title": "Соусы",
      "data": _SAUCE_
    },
    {
      "id": 3,
      "title": "Начинки",
      "data": _MAIN_
    }
  ];
  
  return (
    <section className={style.section}>
      <h1 className={style.title}>Соберите бургер</h1>
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
      <div className={style.list_wrapper} >
      {
      arrayTypesList.map((list) => {
        return (
        <BurgerIngredientsTypeList
          key={list.id}
          data={list.data}
          title={list.title}
          showModal={showModal}
          hideModal={hideModal}
          />
          )
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
