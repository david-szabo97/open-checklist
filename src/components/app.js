import preact, { h } from 'preact'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Main from './main'
import configureStore from '../redux/store'

if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update')
  whyDidYouUpdate(preact)
}

const { store, persistor } = configureStore()

const App = () => (
  <Provider store={store}>
    <div id='app'>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </div>
  </Provider>
)

export default App
