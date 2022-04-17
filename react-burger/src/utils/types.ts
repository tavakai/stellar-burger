import { Location } from "history";
import { ReactElement, ReactNode } from "react";

export interface IIngredient {
  calories: number,
  carbohydrates: number,
  fat: number,
  image: string,
  image_large: string,
  image_mobile: string,
  name: string,
  price: number,
  proteins: number,
  type: string,
  __v: number,
  _id: string,
  id: string,
  key: string
}

export interface IConstructorItem {
  ingredient: IIngredient,
  index: number,
  handleClose: (key: string) => void,
  moveIngredient: (dragIndex: number, hoverIndex: number) => void
}

export interface IDndItem {
  id: string,
  index: number
}

export interface IIngredientCard {
  ingredient: IIngredient,
  id: string
}

export interface IIngredientsListSection {
  data: Array<IIngredient>,
  title: string
}

export interface IModal {
  hideModal: () => void,
  children: ReactNode,
  header?: boolean,
  title?: string
}

export interface IModalOverlay {
  closeModal: () => void,
  children: ReactNode
}

export interface IProtectedRoute {
  children: ReactElement
}