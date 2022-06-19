import { AnyAction } from 'redux';
import { tabsReducer, initialState } from "./tabs";
import * as types from '../../actions/constants';

describe('tabs reducer', () => {
  const action = {
    type: types.SWITCH_TAB,
    tab: undefined
  }
  it('should switch tab', () => {
    expect(tabsReducer(initialState, {
      type: types.SWITCH_TAB,
      tab: 'Булки'
    })).toEqual({
      activeTab: 'Булки'
    })
  })
})