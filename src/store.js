import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers/rootReducer'
import rootSaga from './sagas/indexSaga'
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware()
export default createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(rootSaga)