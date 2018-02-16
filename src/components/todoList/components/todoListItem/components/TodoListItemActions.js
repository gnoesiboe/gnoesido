// @flow

import React from 'react';
import SortableListItemHandle from '../../../../shared/sortableList/SortableHandle';
import type { Todo } from '../../../../../model/type/Todo';

export type OnDeleteCallback = (id: string) => void;
export type OnToggleActiveStatusCallback = (id: string) => void;
export type OnEditCallback = (id: string) => void;

type Props = {
    onToggleActiveStatus: OnToggleActiveStatusCallback,
    onDelete: OnDeleteCallback,
    onEdit: OnEditCallback,
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
                    className="todo-list-item-actions--drag-handle"
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
                    className="btn-link"
                    onClick={ this._onDelete }
                    data-tip data-for="action-delete"
                >
                    <i className="glyphicon glyphicon-remove" />
                </button>
            </li>
        );
    }

    _onEdit = () : void => {
        var { todo, onEdit } = this.props;

        onEdit(todo.id);
    }

    _renderEditAction() : React$Element<any> {
        return (
            <li>
                <button
                    className="btn-link"
                    onClick={ this._onEdit }
                    data-tip data-for="action-edit"
                >
                    <i className="glyphicon glyphicon-pencil" />
                </button>
            </li>
        );
    }

    render() : React$Element<any> {
        return (
            <ul className="list-inline pull-right todo-list-item-actions">
                { this._renderEditAction() }
                { this._renderToggleActiveStatusAction() }
                { this._renderSortHandle() }
                { this._renderDeleteAction() }
            </ul>
        );
    }
}
