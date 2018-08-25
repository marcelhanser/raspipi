import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {addLocaleData, IntlProvider} from "react-intl";
import locale_de from 'react-intl/locale-data/de';

addLocaleData([ ...locale_de]);
ReactDOM.render(
    <BrowserRouter>
        <IntlProvider locale={'de-DE'}>
            <App/>
        </IntlProvider>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();


