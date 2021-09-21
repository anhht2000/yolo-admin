import createSagaMiddleware from '@redux-saga/core';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { rootSaga } from './saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
