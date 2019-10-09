// Dependencies
import React from 'react'
import { renderToString } from 'react-dom/server'
import { matchPath } from 'react-router-dom'
import { Provider } from 'react-redux'
// Redux Store
import configureStore from 'Shared/configureStore'
// Containers
import AppContainer from 'App/index'
// Routes
import routes from 'Shared/routes'
// HTML
import html from './html'

export default function serverRender(): any {
  return (
    req: { url: string },
    res: { component: string, redirect: any, send: any },
    next: any
  ) => {
    // Configure Redux Store
    const store = configureStore()
    // Getting the promises from the components which has initialAction.
    const promises = routes.reduce((acc, route) => {
      if (
        matchPath(req.url, route) &&
        route.component &&
        route.component.initialAction
      ) {
        acc.push(
          Promise.resolve(
            store.dispatch(route.component.initialAction('server'))
          )
        )
      }

      return acc
    }, [])

    Promise.all(promises)
      .then(() => {
        const context = {}
        const initialState = store.getState()
        // Rendering with SSR
        const markup: string = renderToString(
          <Provider store={store}>
            <AppContainer server location={req.url} context={context} />
          </Provider>
        )

        if (context.url) {
          res.redirect(301, context.url)
        } else {
          res.send(
            html({
              initialState,
              markup
            })
          )
        }
      })
      .catch(next)
  }
}
