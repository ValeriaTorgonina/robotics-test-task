import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {fonts} from './fonts/index';
import ShipChartScreen from './modules/main';
import { RootReducer, initialState } from './core/store';

export const store = createStore(RootReducer ,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

class App extends React.Component {
    render () {
       return <ShipChartScreen/>
    }
}

ReactDOM.render(    
    <Provider store={store}>
        <App style={fonts}></App>
    </Provider>,
    document.getElementById('root')
);

