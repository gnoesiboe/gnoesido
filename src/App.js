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

import 'react-notifications/lib/notifications.css';

type Props = {};

class App extends React.Component<Props> {

    render() : React$Element<any> {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path="/" exact component={ HomePage } />
                        <Route path="/:id" exact component={ TodoListPage } />
                    </Switch>
                </Router>
                <NotificationContainer/>
            </div>
        );
    }
}

export default App;
