import { createStore, applyMiddleware } from 'redux'
import rootReducer from './root-reducer'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import {whoami} from './auth'

const store = createStore(rootReducer, applyMiddleware(createLogger(), thunkMiddleware))

export default store

// Set the auth info at start
store.dispatch(whoami()) 
