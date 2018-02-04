// @flow

import React from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import TodoListItem from './components/todoListItem/TodoListItem';
import type { Todo } from '../../model/type/Todo';
import type { GlobalStateType } from '../../store/globalStateType';
import { createUpdateTodoAction } from '../../action/actionFactory';

type Props = {
    items: Array<Todo>,
    dispatch: Function
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
            <TodoListItem
                key={ item.id }
                item={ item}
                onChange={ this._onTodoChanged.bind(this, item.id) }
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

function _mapGlobalStateToProps(globalState: GlobalStateType ): OwnProps {
    return {
        items: globalState.todos
    };
}

const connector: Connector<{}, Props> = connect(_mapGlobalStateToProps);

export default connector(TodoList);
