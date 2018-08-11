import { createStore } from 'redux'
import checklistApp from '../redux/reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export default () => {
  const persistConfig = { key: 'root', storage }

  const persistedReducer = persistReducer(persistConfig, checklistApp)

  const devTools = typeof devToolsExtension === 'function' ? window.devToolsExtension() : undefined
  const store = createStore(persistedReducer, undefined, devTools)

  const persistor = persistStore(store)

  return {
    persistor,
    store
  }
}
