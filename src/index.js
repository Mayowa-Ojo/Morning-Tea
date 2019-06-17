import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
// import App from './dog-finder/App';
import App from './morning-tea/App';
// import App from './manga_scrape/App';

ReactDOM.render(
    // <BrowserRouter>
        <App />,
    // </BrowserRouter>,
    document.getElementById('root')
);

if(module.hot) {
    module.hot.accept()
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
