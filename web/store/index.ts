import { createStore, applyMiddleware } from 'redux'
import reducer from './modules/Cart/reducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import sagas from './modules/Cart/saga'
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)
const sagaMiddleware = createSagaMiddleware()

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware))

const persistor = persistStore(store)

sagaMiddleware.run(sagas)

export { store, persistor, sagaMiddleware }
