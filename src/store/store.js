import { combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { toyReducer } from './toy/toy.reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    toyModule: toyReducer
})

export const store = createStore(rootReducer, composeEnhancers())