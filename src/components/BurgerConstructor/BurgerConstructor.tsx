import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import style from "./BurgerConstructor.module.css";
import BurgerConstructorItem from "./BurgerConstructorItem/BurgerConstructorItem";
import { useDrop } from 'react-dnd';
import {
  addIngredientInConstructor,
  deleteIngredientFromConstructor,
  sortIngredientsInConstructor,
  addBun,
  deleteBun
} from "../../services/actions/actionCreators/ingredients";
import {BUN, SAUCE, MAIN} from "../../services/types/ingredientTypes";
import Order from "./Order/Order";
import { IIngredient } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../services/types/reduxHooks";

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const { ingredients } = useAppSelector(store => store.ingredients); 
  const { ingredientsInConstructor, buns } = useAppSelector(store => store.burgerConstructor); 
  
  const [{ingredientType}, constructorDrag] = useDrop({
    accept: [BUN, SAUCE, MAIN],
    drop(item: IIngredient) {
      onDropHandler(item.id);
    },
    collect: monitor => ({
      ingredientType: monitor.getItemType()
    })
  })

  const onDropHandler = (ingredientId: string) => {
    const constructorItem = ingredients.find(el => el._id === ingredientId);
    if(ingredientType === BUN && constructorItem) {
      dispatch(addBun(constructorItem))
    } else if(constructorItem) {
      dispatch(addIngredientInConstructor(constructorItem));
    }
  }

  const deleteIngredient = (key: string | undefined) => {
    if(key !== undefined) {
       dispatch(deleteIngredientFromConstructor(key))
    } else {
    dispatch(deleteBun())
    }
  }

  const moveIngredient = (dragIndex: number, hoverIndex: number) => {
    const sortedIngredientsArr = [...ingredientsInConstructor];
    const dragIndexItem = sortedIngredientsArr[dragIndex];
    sortedIngredientsArr.splice(dragIndex, 1);
    sortedIngredientsArr.splice(hoverIndex, 0, dragIndexItem);

    dispatch(sortIngredientsInConstructor(sortedIngredientsArr))
  }

  return (
    <section className={style.wrapper} ref={constructorDrag} data-cy="constructor_list" >
      
      {
        buns !== null ? (
          <ConstructorElement
        type="top"
        isLocked={false}
        text={buns.name + ' (верх)'}
        price={buns.price}
        thumbnail={buns.image}
        handleClose={() => deleteIngredient(undefined)}
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
          {ingredientsInConstructor.map((el: IIngredient, index: number) => {
          return (
             <BurgerConstructorItem 
              key={el.key}
              ingredient={el}
              handleClose={() => deleteIngredient(el.key)}
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
        handleClose={() => deleteIngredient(undefined)}
      />
        ) : (
          <div className={style.bun_plug_bottom}>
            <p>Выберите булку</p>
          </div>
        )
      }
      <Order />
    </section>
  );
};

export default BurgerConstructor;
