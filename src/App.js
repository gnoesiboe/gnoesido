// @flow
import * as React from 'react';
import { createStore } from './store/createStore';
import { Provider } from 'react-redux';
import TodoList from './components/todoList/TodoList';

type Props = {};

class App extends React.Component<Props> {
    render() {
        return (
            <Provider store={ createStore() }>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            <TodoList />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <TodoList />
                        </div>
                        <div className="col-md-3">
                            <TodoList />
                        </div>
                        <div className="col-md-3">
                            <TodoList />
                        </div>
                        <div className="col-md-3">
                            <TodoList />
                        </div>
                    </div>
                </div>
            </Provider>
        );
    }
}

export default App;
