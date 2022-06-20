import { ISwitchTabsState, TSwitchTabActions,  } from '../../actions/actionTypes';
import {
  SWITCH_TAB
} from '../../actions/constants';

export const initialState: ISwitchTabsState = {
  activeTab: "Булки"
}

export const tabsReducer = (state = initialState, action: TSwitchTabActions): ISwitchTabsState => {
  switch(action.type) {
    case SWITCH_TAB: {
      return {
        ...state,
        activeTab: action.tab
      }
    }
    default: {
      return state
    }
  }
}