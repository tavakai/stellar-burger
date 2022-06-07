import { TOrder } from './wsActionTypes';
import {
  SHOW_MODAL,
  HIDE_MODAL,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  CURRENT_INGREDIENT,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_BY_NUMBER,
  ADD_INGREDIENT_IN_CONSTRUCTOR,
  DELETE_INGREDIENT_IN_CONSTRUCTOR,
  MOVE_INGREDIENT_IN_CONSTRUCTOR,
  ADD_BUN,
  DELETE_BUN,
  CLEAR_CONSTRUCTOR,
  SWITCH_TAB,
  GET_REGISTER_REQUEST,
  GET_REGISTER_SUCCESS,
  GET_REGISTER_FAILED,
  UPDATE_USER,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  GET_AUTH_REQUEST,
  GET_AUTH_SUCCESS,
  GET_AUTH_FAILED,
  GET_USER,
  SIGN_OUT,
  FORGOT_PASSWORD,
  RESET_PASSWORD
 } from './constants';
 import { IIngredient, IUser } from '../../utils/types';

export interface IShowModal {
  readonly type: typeof SHOW_MODAL;
}
export interface IHideModal {
  readonly type: typeof HIDE_MODAL;
}

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: Array<IIngredient>
}
export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface ICurrentIngredient {
  readonly type: typeof CURRENT_INGREDIENT;
  readonly currentIngredient: IIngredient | TOrder;
}
export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly orderNumber: number;
}
export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}
export interface IGetOrderByNumber {
  readonly type: typeof GET_ORDER_BY_NUMBER;
  readonly order: TOrder | null | undefined;
}
export interface IAddIngredientInConstructor {
  readonly type: typeof ADD_INGREDIENT_IN_CONSTRUCTOR;
  readonly constructorItem: IIngredient;
  readonly key: string;
}
export interface IDeleteIngredientInConstructor {
  readonly type: typeof DELETE_INGREDIENT_IN_CONSTRUCTOR;
  readonly key: string;
}
export interface IMoveIngredientInConstructor {
  readonly type: typeof MOVE_INGREDIENT_IN_CONSTRUCTOR;
  readonly ingredients: Array<IIngredient>;
}
export interface IAddBun {
  readonly type: typeof ADD_BUN;
  readonly bun: IIngredient;
}
export interface IDeleteBun {
  readonly type: typeof DELETE_BUN;
}
export interface IClearConstructor {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}
export interface ISwitchTab {
  readonly type: typeof SWITCH_TAB;
  readonly tab: string | null | undefined;
}
export interface IGetRegisterRequest {
  readonly type: typeof GET_REGISTER_REQUEST;
}
export interface IGetRegisterSuccess {
  readonly type: typeof GET_REGISTER_SUCCESS;
}
export interface IGetRegisterFailed {
  readonly type: typeof GET_REGISTER_FAILED;
}
export interface IUpdateUser {
  readonly type: typeof UPDATE_USER;
  readonly user: IUser;
}
export interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;
}
export interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
}
export interface IUpdateUserFailed {
  readonly type: typeof UPDATE_USER_FAILED;
}
export interface IGetAuthRequest {
  readonly type: typeof GET_AUTH_REQUEST;
}
export interface IGetAuthSuccess {
  readonly type: typeof GET_AUTH_SUCCESS;
  readonly user: IUser;
}
export interface IGetAuthFailed {
  readonly type: typeof GET_AUTH_FAILED;
}
export interface IGetUser {
  readonly type: typeof GET_USER;
  readonly user: IUser;
}
export interface ISignOut {
  readonly type: typeof SIGN_OUT;
}
export interface IForgotPassword {
  readonly type: typeof FORGOT_PASSWORD;
}
export interface IResetPassword {
  readonly type: typeof RESET_PASSWORD;
}

export type TAuthActions =
| IGetAuthFailed
| IGetAuthRequest
| IGetAuthSuccess
| ISignOut;

export type TUserActions = 
| IGetUser
| IUpdateUser
| IUpdateUserRequest
| IUpdateUserSuccess
| IUpdateUserFailed;

export type TConstructorActions = 
| IAddIngredientInConstructor
| IDeleteIngredientInConstructor
| IMoveIngredientInConstructor
| IAddBun
| IDeleteBun
| IClearConstructor;

export type TOrderActions = 
| IGetOrderRequest
| IGetOrderSuccess
| IGetOrderFailed
| IGetOrderByNumber;

export type TRegisterActions = 
| IGetRegisterRequest
| IGetRegisterSuccess
| IGetRegisterFailed;

export type TIngredientsActions = 
| IGetIngredientsRequest
| IGetIngredientsSuccess
| IGetIngredientsFailed
| ICurrentIngredient
| IShowModal
| IHideModal;

export type TSwitchTabActions = ISwitchTab;

export type TAvailableActions =
| TAuthActions | TUserActions | TConstructorActions
| TOrderActions | TRegisterActions | TIngredientsActions
| TSwitchTabActions;

export interface IAuthState {
  loggedIn: boolean;
  authRequest: boolean;
  authFailed: boolean;
  authSuccess: boolean;

  currentUser: {
    name: string,
    email: string | undefined
  },

  updateUserRequest: boolean;
  updateUserSuccess: boolean;
  updateUserFailed: boolean;
}

export interface IConstructorState {
  buns: null | IIngredient,
  bunsCount: number, 
  ingredientsInConstructor: Array<IIngredient>,

  totalPrice: number,
}

export interface IOrderState {
  orderRequest: boolean,
  orderFailed: boolean,
  orderSuccess: boolean,

  orderByNumber: TOrder | null | undefined;

  orderNumber: null | number
}
export interface IRegisterState {
  registerRequest: boolean,
  registerFailed: boolean,
  registerSuccess: boolean
}
export interface ISwitchTabsState {
  activeTab: string | null | undefined
}
export interface IIngredientsState {
  ingredients: Array<IIngredient>,
  ingredientsRequest: boolean,
  ingredientsFailed: boolean,

  modalContent: null | IIngredient | TOrder,
  modal: boolean
}