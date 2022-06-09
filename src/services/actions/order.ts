import api from '../../utils/api';
import { AppDispatch } from './../../utils/types';
import { getOrderByNumber } from './actionCreators/order';


export function getOrder(id: string | undefined) {
  return function (dispatch: AppDispatch) {
    api.getOrderByNumber(id)
      .then(res => {
        if(res && res.success) {
          dispatch(getOrderByNumber(res.orders[0]))
        }
      })
      .catch(err => {
        return err;
      })
  }
}