import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import SplashPage from './components/splashpage/SplashPage'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
