import { createStore, compose, applyMiddleware } from 'redux';
import reducers from './ducks/index-reducers'; 
import createSagaMiddleware from 'redux-saga'; 
import sagas from './sagas/index-sagas';

const middlewares = [];

const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);

const composer = process.env.NODE_ENV !== 'development'
  ? compose(
    applyMiddleware(...middlewares),
    console.tron.createEnhancer(),
  )
  : applyMiddleware(...middlewares);

const store = createStore(reducers, composer);

sagaMiddleware.run(sagas);

export default store;