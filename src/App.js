import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import {applyMiddleware, createStore} from 'redux'
import {rootReducer} from './redux/reducers/root.reducer'
import thunk from 'redux-thunk'

import { HomePage } from './pages/Home'
import './App.sass'
import {Provider} from "react-redux";

const store = createStore(rootReducer, applyMiddleware(thunk))

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={HomePage} />
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))
