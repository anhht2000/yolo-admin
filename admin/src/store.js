// import { createStore } from 'redux'

// const initialState = {
//   sidebarShow: true,
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }
// const store = createStore(changeState)

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import creatSagaMiddleware from 'redux-saga'
import rootSaga from './redux/saga/rootSaga'
import appSlice from './redux/slice/index'

const rootReducer = combineReducers({
  app: appSlice,
})

const sagaMiddleware = creatSagaMiddleware()

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(sagaMiddleware)
  },
})

sagaMiddleware.run(rootSaga)

export default store
