import { ISwitchTab } from './../actionTypes';
import {
  SWITCH_TAB,
} from '../constants';

// Экшен на смену табов
export const switchTab = (tab: string | null | undefined): ISwitchTab => ({
  type: SWITCH_TAB,
  tab
})