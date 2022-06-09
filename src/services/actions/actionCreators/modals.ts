import { IShowModal, IHideModal } from './../actionTypes';
import {
  SHOW_MODAL,
  HIDE_MODAL
} from '../constants';

// Модальные окна
export const showModal = (): IShowModal => ({
  type: SHOW_MODAL
})
export const hideModal = (): IHideModal => ({
  type: HIDE_MODAL
})