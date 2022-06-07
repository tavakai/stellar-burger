import { IGetOrderByNumber } from './../actionTypes';
import { GET_ORDER_BY_NUMBER } from './../constants';
import { TOrder } from './../wsActionTypes';

export const getOrderByNumber = (order: TOrder): IGetOrderByNumber => ({
  type: GET_ORDER_BY_NUMBER,
  order
})