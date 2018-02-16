// @flow

import React from 'react';
import ProjectList from '../components/projectList/ProjectList';
import TodoList from '../components/todoList/TodoList';
import { Provider } from 'react-redux';
import { createStore } from './../store/createStore';
import { Redirect } from 'react-router-dom';
import { hasStateForId } from '../repository/localStorageRepository';
import { generateHomePath } from '../routing/urlGenerator';

type Props = {
    match: {
        params: {
            [string]: string
        }
    }
};

export default function TodoListPage(props: Props): React$Element<any> {
    var id = props.match.params.id;

    if (!id || !hasStateForId(id)) {
        return <Redirect to={ generateHomePath() } />;
    }

    var store = createStore(id);

    return (
        <Provider store={ store }>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <h2>Active</h2>
                        <TodoList
                            currentProject={ null }
                            showOnlyActive={ true }
                        />
                    </div>
                </div>
                <hr />
                <ProjectList />
            </div>
        </Provider>
    );
}
