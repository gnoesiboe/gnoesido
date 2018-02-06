// @flow
import * as React from 'react';
import { createStore } from './store/createStore';
import { Provider } from 'react-redux';
import TodoList from './components/todoList/TodoList';
import ProjectList from './components/projectList/ProjectList';
import type { Todo } from './model/type/Todo';

type Props = {};

class App extends React.Component<Props> {
    render() : React$Element<any> {
        var store = createStore();

        return (
            <Provider store={ store }>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            <h2>Active</h2>
                            <TodoList filter={ (todo: Todo) => todo.active === true }/>
                        </div>
                    </div>
                    <ProjectList />
                </div>
            </Provider>
        );
    }
}

export default App;
