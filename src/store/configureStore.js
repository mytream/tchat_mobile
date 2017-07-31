import { createStore, combineReducers, applyMiddleware} from 'redux'

// import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'

import userInfoReducer from './user/reducer'
import usersReducer from './users/reducer'
import messagesReducer from './messages/reducer'
import navReducer from './nav/reducer'; // nav reducer


const reducers = combineReducers({
  nav: navReducer,
  userInfo: userInfoReducer,
  users: usersReducer,
  messages: messagesReducer,
});

export default function () {
  return createStore(
    reducers,
    applyMiddleware(
      // thunk,
      promiseMiddleware
    ),
  );
}
