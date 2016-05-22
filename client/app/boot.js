// Dependencies
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../redux/store';

const store = configureStore();

//import style from '../style/master.scss';
import favicon from './favicon.png';
import App from '../components/App.js';
import FrontPageController from '../components/FrontPageController';
import TodosController from '../components/TodosController';
import AdminController from '../components/AdminController';

// Router
import {
    Router,
    Route,
    Redirect,
    IndexRedirect,
    browserHistory,
    IndexRoute,
} from 'react-router';

render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRedirect to="/blog"></IndexRedirect>
                <Route path="/blog" component={FrontPageController}></Route>
                <Route path="/about" component={FrontPageController}></Route>
                <Route path="/todos" component={TodosController}></Route>
                <Route path="/admin" component={AdminController}></Route>
                <Redirect from="/*" to="/blog"></Redirect>
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));
