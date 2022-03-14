import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import style from "./BurgerConstructor.module.css";
import BurgerConstructorItem from "./BurgerConstructorItem/BurgerConstructorItem";
import { useDrop } from 'react-dnd';
import {
  addIngredientInConstructor,
  deleteIngredientFromConstructor,
  sortIngredientsInConstructor,
  addBun,
  deleteBun
} from "../../services/actions";
import {BUN, SAUCE, MAIN} from "../../services/types/ingredientTypes";
import Order from "./Order/Order";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(store => store.ingredients);
  const { ingredientsInConstructor, buns } = useSelector(store => store.burgerConstructor);
  
  const [{ingredientType}, constructorDrag] = useDrop({
    accept: [BUN, SAUCE, MAIN],
    drop(item) {
      onDropHandler(item.id);
    },
    collect: monitor => ({
      ingredientType: monitor.getItemType()
    })
  })

  const onDropHandler = (ingredientId) => {
    const constructorItem = ingredients.find(el => el._id === ingredientId);
    if(ingredientType === BUN) {
      dispatch(addBun(constructorItem))
    } else {
      dispatch(addIngredientInConstructor(constructorItem));
    }
  }

  const deleteIngredient = (key) => {
    if(key !== undefined) {
       dispatch(deleteIngredientFromConstructor(key))
    } else {
    dispatch(deleteBun())
    }
  }

  const moveIngredient = (dragIndex, hoverIndex) => {
    const sortedIngredientsArr = [...ingredientsInConstructor];
    const dragIndexItem = sortedIngredientsArr[dragIndex];
    sortedIngredientsArr.splice(dragIndex, 1);
    sortedIngredientsArr.splice(hoverIndex, 0, dragIndexItem);

    dispatch(sortIngredientsInConstructor(sortedIngredientsArr))
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
      <Order />
    </section>
  );
};

export default BurgerConstructor;
