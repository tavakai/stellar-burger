import { rootReducer } from './../services/reducers/index';
import { TOrder } from './../services/actions/wsActionTypes';
import { ReactElement, ReactNode } from "react";
import store from '../services/store/index';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TAvailableActions } from '../services/actions/actionTypes';

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
  key: string,
}

export interface IOrderComposition {
  item: IIngredient,
  order: TOrder
}

export interface IUser {
  name: string,
  login?: string,
  email?: string,
  password?: any
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

export interface IUserFetch {
  name?: string,
  email?: string,
  password?: string | number,
  token?: string
}

export interface IApiProps {
  baseUrl: string,
  headers: HeadersInit
}

export interface IOrderItemLocation {
  space?: string,
  feed: TOrder
}

export interface IFeedList {
  space?: string
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>; 
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TAvailableActions>>;