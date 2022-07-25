import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {HelmetProvider } from 'react-helmet-async';


import reducers from './reducers';
import App from './App';
import './index.scss';

import './styles/color.scss';
import './styles/flexbox.scss';
import './styles/typography.scss';
import './styles/inputs.scss';
import './styles/spacing.scss';
import './styles/skeleton.scss';
import './styles/cards.scss';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <HelmetProvider>
            <App />
        </HelmetProvider>
    </Provider>
);