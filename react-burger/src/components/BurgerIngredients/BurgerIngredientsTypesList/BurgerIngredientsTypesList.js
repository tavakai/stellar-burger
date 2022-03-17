import BurgerIngredientsCard from "../BurgerIngredientsCard/BurgerIngredientsCard";
import style from "./BurgerIngredientsTypeList.module.css";
import styleParentElement from "../BurgerIngredients.module.css";
import PropTypes from "prop-types";
import { useSwitchTab } from "../../../hooks/useSwitchTab";
import { useEffect, useRef, useMemo } from "react";
import { SWITCH_TAB } from "../../../services/actions";
import { useDispatch } from "react-redux";

import { useInView } from 'react-intersection-observer'

const BurgerIngredientsTypeList = ({ data, title }) => {
  const dispatch = useDispatch();
  // const rootRef = useRef(document.querySelector(`.${styleParentElement.list_wrapper}`));
  // const {targetRef, currentTab} = useSwitchTab({
  //   root: rootRef.current,
  //   rootMargin: '0px 0px 0px 0px',
  //   threshold: [0.4, 1] 
  // });

  // useEffect(() => {
  //   console.log(currentTab);
  //   if(currentTab !== null) {
      // console.log(currentTab);
      // dispatch({
      //   type: SWITCH_TAB,
      //   tab
      // })
    // }
  // }, [])

  // const checkCurrentTab = useMemo(() => {
  //   return console.log(tab);
  // }, [tab]);

  return (
    <section data-id={title}>
      <h2 className={`${style.title} ${style.test}`}>{title}</h2>
      <div className={style.list}>
        {data.map((el) => {
          return <BurgerIngredientsCard key={el._id} item={el} />;
        })}
      </div>
    </section>
  );
};

BurgerIngredientsTypeList.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default BurgerIngredientsTypeList;
