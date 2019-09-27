import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import RootReducer from './Reducers/RootReducer';

export default function configureStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


  let store = createStore(
    RootReducer, 
    composeEnhancers(applyMiddleware(thunk))
  ) 
  return store
}