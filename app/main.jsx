'use strict'
require('APP/public/style.scss')
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import AppContainer from './containers/AppContainer'


import Jokes from './components/Jokes'
import Login from './components/Login'
import LoginForm from './components/LoginForm'
import WhoAmI from './components/WhoAmI'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/login" component={LoginForm}/>
      <Route path="/" component={AppContainer}/>
    </Router>
  </Provider>,
  document.getElementById('main')
)
