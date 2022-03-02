import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/index';
import style from "./BurgerIngredients.module.css";
import style_2 from "./BurgerIngredientsTypesList/BurgerIngredientsTypeList.module.css";
import BurgerIngredientsTypeList from "./BurgerIngredientsTypesList/BurgerIngredientsTypesList";
import { SWITCH_TAB } from '../../services/actions/index';
import { useSwitchTab } from "../../hooks/useSwitchTab";

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(store => store.ingredients);
  const { activeTab } = useSelector(store => store.tabs);
  const _BUN_ = ingredients.filter((el) => el.type === "bun");
  const _MAIN_ = ingredients.filter((el) => el.type === "main");
  const _SAUCE_ = ingredients.filter((el) => el.type === "sauce");

  function tabClick(tab) {
    dispatch({
      type: SWITCH_TAB,
      tab
    })
  }

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

  useEffect(() => {
    dispatch(getIngredients());
  }, [])

  // useEffect(() => {
  //   dispatch({
  //     type: SWITCH_TAB,
  //     tab: currentTab
  //   })
  // }, [])
  
  return (
    <section className={style.section}>
      <h1 className={style.title}>Соберите бургер</h1>
      <div className={style.tabsContainer}>
        <Tab value="Булки" active={activeTab === "Булки"} onClick={() => tabClick("Булки")}>
          Булки
        </Tab>
        <Tab value="Соусы" active={activeTab === "Соусы"} onClick={() => tabClick( "Соусы")}>
          Соусы
        </Tab>
        <Tab value="Начинки" active={activeTab === "Начинки"} onClick={() => tabClick("Начинки")}>
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
          />
          )
      })
      }
    </div>
    </section>
  );
};

export default BurgerIngredients;
