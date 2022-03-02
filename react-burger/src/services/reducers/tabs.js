import { SWITCH_TAB } from "../actions";

const initialState = {
  activeTab: "Булки"
}

export const tabsReducer = (state = initialState, action) => {
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