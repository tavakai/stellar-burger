import {
  SHOW_MODAL,
  HIDE_MODAL
} from '../actionTypes';

// Модальные окна
export const showModal = () => ({
  type: SHOW_MODAL
})
export const hideModal = () => ({
  type: HIDE_MODAL
})