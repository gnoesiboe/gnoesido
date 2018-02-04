// @flow

import React from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import TodoListItem from './components/todoListItem/TodoListItem';
import type { Todo } from '../../model/type/Todo';

type Props = {
    items: Array<Object>
};

class TodoList extends React.Component<Props> {

    _onTodoChanged(checked: boolean, title: string): void {
        console.log('new values: ', checked, title);
    }

    _renderItem(item: Todo): React$Element<any> {
        return (
            <TodoListItem
                key={ item.id }
                item={ item}
                onChange={ this._onTodoChanged.bind(this) }
            />
        );
    }

    render(): ?React$Element<any> {
        var { items } = this.props;

        if (items.length === 0) {
            return null;
        }

        return (
            <div className="todo-list">
                <ul className="list-unstyled">
                    { items.map((item) => this._renderItem(item)) }
                </ul>
            </div>
        );
    }
}

function _mapGlobalStateToProps(globalState: { todos: Array<Object> }): Props {
    var componentProps: Props = {
        items: globalState.todos
    };

    return componentProps;
}

const connector: Connector<{}, Props> = connect(_mapGlobalStateToProps);

export default connector(TodoList);
