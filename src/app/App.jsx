/* eslint-disable no-unused-expressions */
// Dependencies
import React, { Component, Fragment } from 'react'
/* import { Route } from 'react-router-dom'
// API
import { createUser } from 'Api/Register' */
// Components
/* import Footer from 'Components/Footer'
import ModalProvider from 'Components/commons/ModalMessage/ModalProvider'
import Spinner from 'Components/commons/Spinner'
import { questionMessage } from 'SharedUtils/Utils'
import Registration from 'Containers/Register' */

// Flow Props and State
type Props = {
  /* routes: Object,
  history: any */
}
type State = {
  /* userInfo: Object,
  isLoading: boolean,
  showModal: boolean,
  content: Array<mixed>,
  data: Object */
}

/* const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact={route.exact}
    render={props => (
      <route.component
        {...props}
        handleLoading={route.handleLoading}
        dataCallback={route.dataCallback}
        onShowModal={route.onShowModal}
        handleHide={route.handleHide}
        routes={route.routes}
      />
    )}
  />
) */

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component<Props, State> {
  /* state = {
    userInfo: {},
    isLoading: true,
    showModal: false,
    content: [],
    data: {}
  }

  onLoading = show => {
    this.setState({ isLoading: show })
  }

  onShowModal = modalObj => {
    this.setState({ content: modalObj, showModal: true })
  }

  handleHide = () => {
    this.setState({ showModal: false })
  } */

  render() {
    /* const { userInfo, isLoading, showModal, content, data } = this.state
    const { routes } = this.props */

    return <Fragment>hola mundo</Fragment>
  }
}

export default App
