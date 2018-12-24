import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './configure-store'
import * as serviceWorker from './service-worker';
import App from './components/app';
import './index.css';

const store = configureStore();

const renderApp = () =>
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./components/app', renderApp);
}

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
