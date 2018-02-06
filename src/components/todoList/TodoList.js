// @flow

import React from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import TodoListItem from './components/todoListItem/TodoListItem';
import type { Todo } from '../../model/type/Todo';
import type { GlobalStateType } from '../../store/globalStateType';
import { createUpdateTodoAction } from '../../action/actionFactory';
import type { Action } from '../../action/types';

type Props = {
    items: Array<Todo>,
    dispatch: (action: Action) => void,
    filter: (todo: Todo) => void
};

type OwnProps = {
    items: Array<Todo>
}

class TodoList extends React.Component<Props> {

    _onTodoChanged(id: string, checked: boolean, title: string): void {
        var { dispatch } = this.props;

        dispatch(
            createUpdateTodoAction(id, checked, title)
        );
    }

    _renderItem(item: Todo): React$Element<any> {
        return (
            <li key={ item.id }>
                <TodoListItem
                    item={ item}
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
        items: globalState.todos
    };
}

var connector: Connector<{}, Props> = connect(_mapGlobalStateToProps);

export default connector(TodoList);
