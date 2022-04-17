import {
  SWITCH_TAB,
} from '../actionTypes';

// Экшен на смену табов
export const switchTab = (tab) => ({
  type: SWITCH_TAB,
  tab
})