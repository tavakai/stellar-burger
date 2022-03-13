import {
  ConstructorElement, Button, CurrencyIcon, DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import style from "./BurgerConstructor.module.css";
import PropTypes from 'prop-types';
import BurgerConstructorItem from "./BurgerConstructorItem/BurgerConstructorItem";
import { useDrop } from 'react-dnd';
import {
  ADD_INGREDIENT_IN_CONSTRUCTOR,
  DELETE_INGREDIENT_IN_CONSTRUCTOR,
  MOVE_INGREDIENT_IN_CONSTRUCTOR,
  ADD_BUN,
  DELETE_BUN
} from "../../services/actions";
import generateKey from "../../utils/generateKey";
import {BUN, SAUCE, MAIN} from "../../services/types/ingredientTypes";
import { useRef } from "react";
import Order from "./Order/Order";

const BurgerConstructor = ({ showModal }) => {
  const dispatch = useDispatch();
  const ref = useRef(null)
  const { ingredients } = useSelector(store => store.ingredients);
  const { ingredientsInConstructor, buns } = useSelector(store => store.burgerConstructor);
  
  const [{isOver, ingredientType}, constructorDrag] = useDrop({
    accept: [BUN, SAUCE, MAIN],
    drop(item) {
      onDropHandler(item.id);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      ingredientType: monitor.getItemType()
    })
  })

  const onDropHandler = (ingredientId) => {
    const constructorItem = ingredients.find(el => el._id === ingredientId);
    if(ingredientType === BUN) {
      dispatch({
        type: ADD_BUN,
        bun: constructorItem
      })
    } else {
      dispatch({
      type: ADD_INGREDIENT_IN_CONSTRUCTOR,
      constructorItem,
      key: generateKey()
    });
    }
  }

  const deleteIngredient = (key) => {
    if(key !== undefined) {
       dispatch({
      type: DELETE_INGREDIENT_IN_CONSTRUCTOR,
      key
    })
    } else {
    dispatch({
      type: DELETE_BUN
    })
    }
  }

  const moveIngredient = (dragIndex, hoverIndex) => {
    const sortedIngredientsArr = [...ingredientsInConstructor];
    const dragIndexItem = sortedIngredientsArr[dragIndex];
    sortedIngredientsArr.splice(dragIndex, 1);
    sortedIngredientsArr.splice(hoverIndex, 0, dragIndexItem);

    dispatch({
      type: MOVE_INGREDIENT_IN_CONSTRUCTOR,
      ingredients: sortedIngredientsArr
    })
  }

  return (
    <section className={style.wrapper} ref={constructorDrag}>
      
      {
        buns !== null ? (
          <ConstructorElement
        type="top"
        isLocked={false}
        text={buns.name + ' (верх)'}
        price={buns.price}
        thumbnail={buns.image}
        handleClose={() => deleteIngredient()}
      />
        ) : (
          <div className={style.bun_plug_top}>
          <p>Выберите булку</p>
          </div>
        )
      }
      <div className={style.list_plug}>
        {
          ingredientsInConstructor.length !== 0 ? (
            <ul className={style.list}>
          {ingredientsInConstructor.map((el, index) => {
          return (
             <BurgerConstructorItem 
              key={el.key}
              ingredient={el}
              handleClose={deleteIngredient}
              moveIngredient={moveIngredient}
              index={index}
              />
          );
        })}
      </ul>
          ) : (
            <p>Выберите ингредиенты</p>
          )
        }
      </div>
      
      {
        buns !== null ? (
          <ConstructorElement
        type="bottom"
        isLocked={false}
        text={buns.name + ' (низ)'}
        price={buns.price}
        thumbnail={buns.image}
        handleClose={() => deleteIngredient()}
      />
        ) : (
          <div className={style.bun_plug_bottom}>
            <p>Выберите булку</p>
          </div>
        )
      }
      <Order 
        showModal={showModal}
      />
    </section>
  );
};

BurgerConstructor.propTypes = {
  showModal: PropTypes.func
}

export default BurgerConstructor;
