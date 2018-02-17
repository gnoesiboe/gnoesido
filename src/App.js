// @flow

import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import TodoListPage from './page/TodoListPage';
import HomePage from './page/HomePage';
import { NotificationContainer } from 'react-notifications';
import Menu from './components/menu/Menu';

import 'react-notifications/lib/notifications.css';

type Props = {};

class App extends React.Component<Props> {

    render() : React$Element<any> {
        return (
            <div id="outer-container">
                <Router>
                    <div className="router-container">
                        <Menu
                            pageWrapId="menu-page-wrap"
                            outerContainerId="outer-container"
                        />
                        <div id="menu-page-wrap">
                            <Switch>
                                <Route path="/" exact component={ HomePage } />
                                <Route path="/:id" exact component={ TodoListPage } />
                            </Switch>
                        </div>
                    </div>
                </Router>
                <NotificationContainer/>
            </div>
        );
    }
}

export default App;
