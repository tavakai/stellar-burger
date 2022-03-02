import BurgerIngredientsCard from "../BurgerIngredientsCard/BurgerIngredientsCard";
import style from "./BurgerIngredientsTypeList.module.css";
import styleParentElement from "../BurgerIngredients.module.css";
import PropTypes from "prop-types";
import { useSwitchTab } from "../../../hooks/useSwitchTab";
import { useEffect, useRef } from "react";
import { SWITCH_TAB } from "../../../services/actions";
import { useDispatch } from "react-redux";

const BurgerIngredientsTypeList = ({ data, title }) => {
  const dispatch = useDispatch();
  const rootRef = useRef(document.querySelector(`.${styleParentElement.list_wrapper}`));
  const [targetRef, isVisible] = useSwitchTab({
    root: rootRef.current,
    rootMargin: '0px 0px 200px 0px',
    threshold: [0, 1]
  });
  
  return (
    <section ref={targetRef}>
      <h2 ref={targetRef} className={`${style.title} ${style.test}`}>{title}</h2>
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
