import React from 'react';
import ReactDOM from 'react-dom';
import {fonts} from './fonts/index';

class App extends React.Component {
    render () {
       return 'hello, World'
    }
   }

ReactDOM.render(<App style={fonts}/>, document.getElementById('root'));

