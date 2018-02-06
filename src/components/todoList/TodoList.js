// @flow

import React from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import TodoListItem from './components/todoListItem/TodoListItem';
import type { Todo } from '../../model/type/Todo';
import type { Project } from '../../model/type/Project';
import type { GlobalStateType } from '../../store/globalStateType';
import { createUpdateTodoAction } from '../../action/actionFactory';
import type { Action } from '../../action/types';

type Props = {
    items: Array<Todo>,
    projects: Array<Project>,
    dispatch: (action: Action) => void,
    filter: (todo: Todo) => void
};

type OwnProps = {
    items: Array<Todo>,
    projects: Array<Project>
}

class TodoList extends React.Component<Props> {

    _onTodoChanged(id: string, checked: boolean, title: string): void {
        var { dispatch } = this.props;

        dispatch(
            createUpdateTodoAction(id, checked, title)
        );
    }

    _renderItem(item: Todo): React$Element<any> {

        // $ExpectError
        var project : Project = this.props.projects.find((project) => project.id === item.projectId);

        return (
            <li key={ item.id }>
                <TodoListItem
                    item={ item}
                    project={ project }
                    onChange={ this._onTodoChanged.bind(this, item.id) }
                />
            </li>
        );
    }

    render(): ?React$Element<any> {
        var { items, filter } = this.props;

        if (items.length === 0) {
            return null;
        }

        var filteredItems : Array<Todo> = items.filter(filter);

        return (
            <div className="todo-list">
                <ul className="list-unstyled">
                    { filteredItems.map((item) => this._renderItem(item)) }
                </ul>
            </div>
        );
    }
}

function _mapGlobalStateToProps(globalState: GlobalStateType) : OwnProps {
    return {
        items: globalState.todos,
        projects: globalState.projects
    };
}

var connector: Connector<{}, Props> = connect(_mapGlobalStateToProps);

export default connector(TodoList);
