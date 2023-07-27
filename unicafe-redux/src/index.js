import React from 'react'
import ReactDOM from 'react-dom'
import {Provider, useDispatch, useSelector} from 'react-redux'
import slices from './reducer'
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({reducer: {evaluation: slices.reducer}})

const App = () => {
    const dispatch = useDispatch()
    const evaluation = useSelector(state => state.evaluation)

    const good = () => dispatch(slices.actions.good())
    const bad = () => dispatch(slices.actions.bad())
    const ok = () => dispatch(slices.actions.ok())
    const reset = () => dispatch(slices.actions.zero())

    return (
        <div>
            <button onClick={good}>good</button>
            <button onClick={ok}>ok</button>
            <button onClick={bad}>bad</button>
            <button onClick={reset}>reset stats</button>
            <div>good {evaluation.good}</div>
            <div>ok {evaluation.ok}</div>
            <div>bad {evaluation.bad}</div>
        </div>
    )
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
