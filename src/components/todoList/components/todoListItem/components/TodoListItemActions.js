// @flow

import React from 'react';
import SortableListItemHandle from '../../../../shared/sortableList/SortableHandle';
import type { Todo } from '../../../../../model/type/Todo';

export type OnDeleteCallback = (id: string) => void;
export type OnToggleActiveStatusCallback = (id: string) => void;

type Props = {
    onToggleActiveStatus: OnToggleActiveStatusCallback,
    onDelete: OnDeleteCallback,
    todo: Todo
};

export default class TodoListItemActions extends React.Component<Props> {

    _onToggleActiveStatus = (event: SyntheticInputEvent<HTMLInputElement>) : void => {
        var { onToggleActiveStatus, todo } = this.props;

        onToggleActiveStatus(todo.id);
    }

    _renderToggleActiveStatusAction() : ?React$Element<any> {
        var { todo } = this.props;

        if (todo.active) {
            return (
                <li>
                    <button
                        className="btn-link"
                        onClick={ this._onToggleActiveStatus }
                        data-tip data-for="action-remove-from-active-list"
                    >
                        <i className="glyphicon glyphicon-ban-circle" />
                    </button>
                </li>
            )
        } else {
            return (
                <li>
                    <button
                        className="btn-link"
                        onClick={ this._onToggleActiveStatus }
                        data-tip data-for="action-add-to-active-list"
                    >
                        <i className="glyphicon glyphicon-record" />
                    </button>
                </li>
            );
        }
    }

    _onDelete = (event: SyntheticInputEvent<HTMLInputElement>) : void => {
        var { onDelete, todo } = this.props;

        onDelete(todo.id);
    };

    _renderSortHandle() : React$Element<any> {
        return (
            <li>
                <SortableListItemHandle
                    data-tip data-for="action-sort"
                    className="todo-list-item-drag-handle"
                >
                    <i className="glyphicon glyphicon-menu-hamburger" />
                </SortableListItemHandle>
            </li>
        );
    }

    _renderDeleteAction() : React$Element<any> {
        return (
            <li>
                <button
                    className="btn-link todo-list-item-remove-button"
                    onClick={ this._onDelete }
                    data-tip data-for="action-delete"
                >
                    <i className="glyphicon glyphicon-remove" />
                </button>
            </li>
        );
    }

    render() : React$Element<any> {
        return (
            <ul className="list-inline pull-right todo-list-item-actions">
                { this._renderToggleActiveStatusAction() }
                { this._renderSortHandle() }
                { this._renderDeleteAction() }
            </ul>
        );
    }
}
