import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {HashRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './src/styles/menu.css';
import './src/styles/posts.css';
import './src/styles/title.css';
import './src/styles/styles.css';

import reducers from './src/reducers';
import mainSaga from './src/sagas';

import Title from "./src/components/title";
import Main from "./src/containers/main";
import AddPost from "./src/containers/add-post";
import ViewPost from "./src/containers/view-post";
import EditPost from "./src/containers/edit-post";
import Admin from "./src/containers/admin";
import Menu from './src/containers/menu';
import Error from "./src/containers/error";
import {APPLICATION_LOADED} from "./src/actions";

const sagaMiddleware = createSagaMiddleware();
let store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(mainSaga);

store.dispatch({type: APPLICATION_LOADED});

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div className="main container">
                <div className="title"><Title/></div>
                <Error {...store}/>
                <div className="page row">
                    <Menu {...store}/>
                    <Route exact path="/" component={Main}/>
                    <Route exact path="/view-category/:id" component={Main}/>
                    <Route exact path="/view-author/:id" component={Main}/>
                    <Route exact path="/view-post/:id" component={ViewPost}/>
                    <Route exact path="/edit-post/:id" component={EditPost}/>
                    <Route exact path="/add-post" component={AddPost}/>
                    <Route exact path="/admin" component={Admin}/>
                </div>
            </div>
        </Router>
    </Provider>,
    document.getElementById('app')
)
;
