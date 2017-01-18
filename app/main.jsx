'use strict'
require('APP/public/style.scss')
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './redux/store'
import App from './components/App'
import LoginFormContainer from './containers/LoginFormContainer'

import AllShoesContainer from './containers/AllShoesContainer'
import CartContainer from './containers/CartContainer'
import ConfirmOrderContainer from './containers/ConfirmOrderContainer'

import SingleShoeContainer from './containers/SingleShoeContainer.js'
import ProfileContainer from './containers/ProfileContainer.js'


import {fetchPendingOrder} from './redux/orders'
import {getShoeModel} from './redux/singleShoe'
import {filterAllShoes} from './redux/allShoes'


const onShoeEnter = function (nextRouterState) {
  const shoemodelId = nextRouterState.params.shoemodelid;
  store.dispatch(getShoeModel(shoemodelId));
};

const onMainEnter = function(nextRouterState) {
  store.dispatch(filterAllShoes({color:[], size:[], price:200}))
}

const exampleUser = {id:3};

render (
  <Provider store={store}>
    <Router history={browserHistory}>
    <Route path="/" component={App} onEnter={onMainEnter}>
      <Route
        path='/profile/:id'
        component={ProfileContainer}
        onEnter={next => store.dispatch(getUserOrders(next.params.id))}
      />
      <Route path="shoe/:shoemodelid" component={SingleShoeContainer} onEnter={onShoeEnter} />
      <Route path="/login" component={LoginFormContainer} />
      <Route path="/cart" component={CartContainer} onEnter={store.dispatch(fetchPendingOrder(exampleUser))} />
      <Route path="/confirm" component={ConfirmOrderContainer} onEnter={store.dispatch(fetchPendingOrder(exampleUser))} />
    </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
