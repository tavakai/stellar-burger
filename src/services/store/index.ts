import { wsOrdersActions, wsUserActions } from './../actions/wsActionTypes';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import { socketMiddleware } from '../middleware/socketMiddleware';
import { allOrders, userOrders } from '../../utils/socket';

const store = createStore(
  rootReducer, composeWithDevTools(
    applyMiddleware(
      thunk,
      socketMiddleware(wsOrdersActions),
      socketMiddleware(wsUserActions)
    )
  )
);

export default store;