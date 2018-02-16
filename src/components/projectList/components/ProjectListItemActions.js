// @flow

import React from 'react';
import SortableListItemHandle from '../../shared/sortableList/SortableHandle';
import type { Project } from '../../../model/type/Project';

export type OnDeleteCallback = (id: string) => void;

type Props = {
    project: Project,
    onDelete: OnDeleteCallback
}

export default class ProjectListItemActions extends React.Component<Props> {

    _onDeleteClick = (event: SyntheticInputEvent<HTMLInputElement>) => {
        var { project, onDelete } = this.props;

        onDelete(project.id);
    };

    _renderSortHandle() : React$Element<any> {
        return (
            <li>
                <SortableListItemHandle
                    data-tip data-for="action-sort-project"
                    className="todo-list-item-drag-handle"
                >
                    <i className="glyphicon glyphicon-menu-hamburger" />
                </SortableListItemHandle>
            </li>
        );
    }

    _renderRemoveAction() : React$Element<any> {
        return (
            <li>
                <button
                    className="btn btn-link project-list-item-delete-button"
                    onClick={ this._onDeleteClick }
                    data-tip data-for="action-delete-project"
                >
                    <i className="glyphicon glyphicon-remove" />
                </button>
            </li>
        );
    }

    render() : React$Element<any> {
        return (
            <ul className="list-inline pull-right project-list-item-actions">
                { this._renderSortHandle() }
                { this._renderRemoveAction() }
            </ul>
        );
    }
}
