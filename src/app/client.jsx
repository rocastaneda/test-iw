// Dependencies
import '@babel/polyfill'
import React from 'react'
import { hydrate, render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
// redux store
import configureStore from 'Shared/configureStore'
// Containers
import App from './index'
// Styles
import 'bootstrap/dist/css/bootstrap.css'
import 'SharedStyles/main.less'
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css'

// configuring redux store
const store = configureStore(window.initialState)

// DOM
const rootElement = document.getElementById('root')

const clientDomRenderer = rootElement.hasChildNodes() ? hydrate : render

// App Wrapper
const renderApp = Component => {
  clientDomRenderer(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    rootElement
  )
}

// Rendering app
renderApp(App)

// HMR
if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    renderApp(require('./App').default)
  })
}
