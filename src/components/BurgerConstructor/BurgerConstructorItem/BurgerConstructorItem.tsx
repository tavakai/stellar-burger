import {
  ConstructorElement, DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from 'react-dnd';
import style from '../BurgerConstructor.module.css';
import { ITEM } from "../../../services/types/ingredientTypes";
import { useRef, FC } from "react";
import { IConstructorItem, IDndItem } from "../../../utils/types";

const BurgerConstructorItem: FC<IConstructorItem> = ({ingredient, index, handleClose, moveIngredient}) => {
  const ref = useRef<HTMLLIElement>(null);
  const [{isDrag}, itemDrag] = useDrag({
    type: ITEM,
    item: () => {
      return {
        id: ingredient.key,
        index
      }
    },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  })
  const [collectedProps, itemDrop] = useDrop({
    accept: ITEM,
    hover: (item: IDndItem, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = ((hoverBoundingRect?.bottom ?? 0) - (hoverBoundingRect?.top ?? 0)) / 2;
      
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset?.y ?? 0) - (hoverBoundingRect?.top ?? 0);

      if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if(dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  })
  const opacity = isDrag ? 0 : 1;
  itemDrag(itemDrop(ref));

  return (
    <li className={style.list_item} style={{...style, opacity}} ref={ref} data-cy="constructor_ingredient" >
    <DragIcon type="primary" />
    <ConstructorElement
    text={ingredient.name}
    price={ingredient.price}
    thumbnail={ingredient.image}
    handleClose={() => handleClose(ingredient.key)}
    />
  </li>
  )
}

export default BurgerConstructorItem;