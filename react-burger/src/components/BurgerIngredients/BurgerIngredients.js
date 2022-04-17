import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import style from "./BurgerIngredients.module.css";
import style_2 from "./BurgerIngredientsTypesList/BurgerIngredientsTypeList.module.css";
import { switchTab } from '../../services/actions/actionCreators/tabs';
import BurgerIngredientsCard from "./BurgerIngredientsCard/BurgerIngredientsCard";
import { useSwitchTab } from "../../hooks/useSwitchTab";

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(store => store.ingredients);
  const { activeTab } = useSelector(store => store.tabs);
  const rootRef = useRef(document.querySelector(`.${style.list_wrapper}`));
  const targetElements = document.querySelectorAll(`.${style_2.section}`);
  const {currentTab} = useSwitchTab({
      root: rootRef.current,
      rootMargin: '-190px 0px 0px 0px',
      threshold: [1, 0.3, 0.5]
    }, targetElements)

  const _BUN_ = useMemo(() => ingredients.filter((el) => el.type === "bun"), [ingredients]);
  const _MAIN_ = useMemo(() => ingredients.filter((el) => el.type === "main"), [ingredients]);
  const _SAUCE_ = useMemo(() => ingredients.filter((el) => el.type === "sauce"), [ingredients]);
  
  function tabClick(event) {
    window.scrollTo({
      top: document.getElementById(event).offsetTop,
      behavior: 'smooth'
    })
    dispatch(switchTab(event))
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
    dispatch(switchTab(currentTab))
  }, [currentTab])
  
  useEffect(() => {
    if(ingredients.length === 0) {
      dispatch(getIngredients());
    }
  }, [ingredients])

  return (
    <section className={style.section}>
      <h1 className={style.title}>Соберите бургер</h1>
      <div className={style.tabsContainer}>
        <a href="#Булки" className={style.tabs_title}>
          <Tab value="Булки" active={activeTab === "Булки"} onClick={() => tabClick("Булки")}>
          Булки
        </Tab>
        </a>
        <a href="#Соусы" className={style.tabs_title}>
          <Tab value="Соусы" active={activeTab === "Соусы"} onClick={() => tabClick("Соусы")}>
          Соусы
        </Tab>
        </a>
        <a href="#Начинки" className={style.tabs_title}>
          <Tab value="Начинки" active={activeTab === "Начинки"} onClick={() => tabClick("Начинки")}>
          Начинки
        </Tab>
        </a>
      </div>
      <div className={style.list_wrapper} >
      {
      arrayTypesList.map((list) => {
        return (
          <section
            id={list.title}
            key={list.id}
            className={style_2.section}
            >
            <h2 className={`${style_2.title} ${style_2.test}`}>{list.title}</h2>
            <div className={style_2.list}>
              {list.data.map((el) => {
              return <BurgerIngredientsCard key={el._id} ingredient={el} id={el._id}/>
              })}
            </div>
           </section>
          )
      })
      }
    </div>
    </section>
  );
};

export default BurgerIngredients;
